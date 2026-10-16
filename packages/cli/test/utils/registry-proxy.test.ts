import http from 'node:http';
import https from 'node:https';
import net from 'node:net';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import path from 'pathe';
import { afterEach, describe, expect, it } from 'vitest';
import { fetchRegistryJson } from '../../src/utils/registry/fetch';
import { fetchThroughProxy, getProxyUrl, redactProxyUrl, shouldBypassProxy } from '../../src/utils/registry/proxy';
import type { RegistryLocation } from '../../src/utils/registry/location';

function location(source: string): RegistryLocation {
  return { specifier: 'button', source, headers: {}, namespace: null };
}

function listen(server: http.Server | https.Server) {
  return new Promise<number>((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolve(address && typeof address === 'object' ? address.port : 0);
    });
  });
}

function createProxy() {
  const hits: string[] = [];
  const authorizations: Array<string | string[] | undefined> = [];
  const proxy = http.createServer((request, response) => {
    const target = new URL(request.url ?? '');
    hits.push(target.href);
    const upstream = http.request({
      hostname: target.hostname,
      port: target.port,
      path: `${target.pathname}${target.search}`,
      method: request.method,
      headers: { ...request.headers, host: target.host },
    }, (upstreamResponse) => {
      response.writeHead(upstreamResponse.statusCode ?? 502, upstreamResponse.headers);
      upstreamResponse.pipe(response);
    });
    upstream.on('error', (error) => {
      response.writeHead(502);
      response.end(error.message);
    });
    request.pipe(upstream);
  });

  proxy.on('connect', (request, clientSocket, head) => {
    hits.push(`connect:${request.url ?? ''}`);
    authorizations.push(request.headers['proxy-authorization']);
    const [host, port] = (request.url ?? '').split(':');
    const upstream = net.connect(Number(port), host, () => {
      clientSocket.write('HTTP/1.1 200 Connection Established\r\n\r\n');

      if (head.length > 0) {
        upstream.write(head);
      }

      upstream.pipe(clientSocket);
      clientSocket.pipe(upstream);
    });
    upstream.on('error', () => clientSocket.destroy());
    upstream.on('close', () => clientSocket.destroy());
    clientSocket.on('error', () => upstream.destroy());
    clientSocket.on('close', () => upstream.destroy());
  });

  return { proxy, hits, authorizations };
}

describe('proxy selection', () => {
  it('reads HTTPS_PROXY, HTTP_PROXY, and ALL_PROXY in that order', () => {
    expect(getProxyUrl({ HTTPS_PROXY: 'http://secure-proxy:8443', HTTP_PROXY: 'http://proxy:8080' })).toBe('http://secure-proxy:8443');
    expect(getProxyUrl({ http_proxy: 'http://proxy:8080' })).toBe('http://proxy:8080');
    expect(getProxyUrl({ ALL_PROXY: 'http://all:8080' })).toBe('http://all:8080');
    expect(getProxyUrl({})).toBeUndefined();
  });

  it('redacts proxy credentials', () => {
    expect(redactProxyUrl('http://user:secret@proxy.example:8080')).toBe('http://proxy.example:8080/');
  });

  it('honors NO_PROXY for exact hosts, suffixes, ports, and *', () => {
    expect(shouldBypassProxy('http://127.0.0.1:9/button.json', { NO_PROXY: 'localhost,127.0.0.1' })).toBe(true);
    expect(shouldBypassProxy('https://registry.internal/button.json', { no_proxy: '.internal' })).toBe(true);
    expect(shouldBypassProxy('https://sigma-ui.dev/r/button.json', { NO_PROXY: 'localhost' })).toBe(false);
    expect(shouldBypassProxy('http://127.0.0.1:9/button.json', { NO_PROXY: '127.0.0.1:10' })).toBe(false);
    expect(shouldBypassProxy('https://sigma-ui.dev/r/button.json', { NO_PROXY: '*' })).toBe(true);
  });
});

describe('fetchRegistryJson proxy', () => {
  const servers: Array<http.Server | https.Server> = [];

  afterEach(async () => {
    delete process.env.HTTP_PROXY;
    delete process.env.HTTPS_PROXY;
    delete process.env.http_proxy;
    delete process.env.https_proxy;
    delete process.env.ALL_PROXY;
    delete process.env.all_proxy;
    delete process.env.NO_PROXY;
    delete process.env.no_proxy;
    await Promise.all(servers.splice(0).map(server => new Promise<void>(resolve => server.close(() => resolve()))));
  });

  it('fetches an HTTP registry through HTTP_PROXY', async () => {
    const origin = http.createServer((_request, response) => {
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify({ ok: true }));
    });
    const { proxy, hits } = createProxy();
    servers.push(origin, proxy);
    const originPort = await listen(origin);
    const proxyPort = await listen(proxy);
    process.env.HTTP_PROXY = `http://127.0.0.1:${proxyPort}`;

    const body = await fetchRegistryJson(location(`http://127.0.0.1:${originPort}/button.json`));

    expect(body).toEqual({ ok: true });
    expect(hits).toEqual([`http://127.0.0.1:${originPort}/button.json`]);
  });

  it('bypasses the proxy when the registry host is in NO_PROXY', async () => {
    const origin = http.createServer((_request, response) => {
      response.end(JSON.stringify({ direct: true }));
    });
    const { proxy, hits } = createProxy();
    servers.push(origin, proxy);
    const originPort = await listen(origin);
    const proxyPort = await listen(proxy);
    process.env.HTTP_PROXY = `http://127.0.0.1:${proxyPort}`;
    process.env.NO_PROXY = '127.0.0.1';

    const body = await fetchRegistryJson(location(`http://127.0.0.1:${originPort}/direct.json`));

    expect(body).toEqual({ direct: true });
    expect(hits).toEqual([]);
  });

  it('tunnels HTTPS registry requests with CONNECT', async () => {
    const directory = mkdtempSync(path.join(tmpdir(), 'sigma-ui-proxy-cert-'));
    const keyPath = path.join(directory, 'key.pem');
    const certPath = path.join(directory, 'cert.pem');
    execFileSync('openssl', [
      'req', '-x509', '-newkey', 'rsa:2048',
      '-keyout', keyPath, '-out', certPath,
      '-days', '1', '-nodes', '-subj', '/CN=127.0.0.1',
      '-addext', 'subjectAltName=IP:127.0.0.1',
    ], { stdio: 'pipe' });
    const origin = https.createServer({
      key: readFileSync(keyPath),
      cert: readFileSync(certPath),
    }, (_request, response) => {
      response.end(JSON.stringify({ secure: true }));
    });
    const { proxy, hits, authorizations } = createProxy();
    servers.push(origin, proxy);
    const originPort = await listen(origin);
    const proxyPort = await listen(proxy);
    const cert = readFileSync(certPath);

    const response = await fetchThroughProxy(
      `https://127.0.0.1:${originPort}/button.json`,
      `http://user:secret@127.0.0.1:${proxyPort}`,
      {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(5_000),
        ca: cert,
      },
    );

    expect(await response.json()).toEqual({ secure: true });
    expect(hits).toEqual([`connect:127.0.0.1:${originPort}`]);
    expect(authorizations).toEqual([`Basic ${Buffer.from('user:secret').toString('base64')}`]);
  });
});
