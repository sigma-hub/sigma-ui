import http from 'node:http';
import https from 'node:https';
import net from 'node:net';
import tls from 'node:tls';
import { Buffer } from 'node:buffer';
import type { Duplex } from 'node:stream';

const PROXY_ENV_NAMES = ['https_proxy', 'HTTPS_PROXY', 'http_proxy', 'HTTP_PROXY', 'all_proxy', 'ALL_PROXY'] as const;
const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);
const MAX_REDIRECTS = 5;

export function getProxyUrl(env: NodeJS.ProcessEnv = process.env) {
  for (const name of PROXY_ENV_NAMES) {
    const value = env[name]?.trim();

    if (value) {
      return value;
    }
  }

  return undefined;
}

export function redactProxyUrl(value: string) {
  try {
    const url = parseProxyUrl(value);
    url.username = '';
    url.password = '';
    return url.toString();
  } catch {
    return 'the configured proxy';
  }
}

export function shouldBypassProxy(target: string, env: NodeJS.ProcessEnv = process.env) {
  const noProxy = env.no_proxy ?? env.NO_PROXY;

  if (!noProxy?.trim()) {
    return false;
  }

  const url = new URL(target);
  const port = url.port || (url.protocol === 'https:' ? '443' : '80');
  const hostname = url.hostname.toLowerCase();

  return noProxy.split(/[,\s]+/).some(entry => matchesNoProxy(hostname, port, entry.trim()));
}

interface ProxyRequestInit {
  headers: Record<string, string>;
  signal: AbortSignal;
  ca?: tls.ConnectionOptions['ca'];
}

export async function fetchThroughProxy(target: string, proxyUrl: string, init: ProxyRequestInit) {
  return follow(target, proxyUrl, init, MAX_REDIRECTS);
}

function matchesNoProxy(hostname: string, port: string, entry: string) {
  if (!entry) {
    return false;
  }

  if (entry === '*') {
    return true;
  }

  const pattern = splitHostPattern(entry);

  if (pattern.port && pattern.port !== port) {
    return false;
  }

  const host = pattern.host.replace(/^\.+/, '').toLowerCase();
  return hostname === host || hostname.endsWith(`.${host}`);
}

function splitHostPattern(entry: string) {
  if (entry.startsWith('[')) {
    const closing = entry.indexOf(']');

    if (closing !== -1) {
      const port = entry.slice(closing + 1).replace(/^:/, '');
      return { host: entry.slice(1, closing), port: port || undefined };
    }
  }

  const colon = entry.lastIndexOf(':');

  if (colon > 0 && /^\d+$/.test(entry.slice(colon + 1))) {
    return { host: entry.slice(0, colon), port: entry.slice(colon + 1) };
  }

  return { host: entry, port: undefined };
}

function parseProxyUrl(value: string) {
  const withScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `http://${value}`;
  const url = new URL(withScheme);

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(`Unsupported proxy URL "${withScheme.replace(/\/\/([^/@]+)@/, '//')}". Use an http:// or https:// proxy.`);
  }

  return url;
}

function authorizationHeader(proxy: URL) {
  if (!proxy.username && !proxy.password) {
    return undefined;
  }

  const token = Buffer.from(`${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`).toString('base64');
  return `Basic ${token}`;
}

function originHeaders(target: URL, headers: Record<string, string>): http.OutgoingHttpHeaders {
  return { Host: target.host, ...headers };
}

async function follow(target: string, proxyUrl: string, init: ProxyRequestInit, redirectsLeft: number): Promise<Response> {
  const response = await requestOnce(target, proxyUrl, init);
  const location = response.headers.get('location');

  if (!REDIRECT_STATUSES.has(response.status) || !location || redirectsLeft <= 0) {
    return response;
  }

  const next = new URL(location, target);
  const headers = next.host === new URL(target).host ? init.headers : { Accept: init.headers.Accept ?? 'application/json' };
  return follow(next.toString(), proxyUrl, { ...init, headers }, redirectsLeft - 1);
}

async function requestOnce(target: string, proxyUrl: string, init: ProxyRequestInit) {
  const targetUrl = new URL(target);
  const proxy = parseProxyUrl(proxyUrl);

  if (targetUrl.protocol === 'https:') {
    return requestHttps(targetUrl, proxy, init);
  }

  if (targetUrl.protocol === 'http:') {
    return requestHttp(targetUrl, proxy, init);
  }

  throw new Error(`Unsupported registry URL protocol "${targetUrl.protocol}".`);
}

function requestHttp(target: URL, proxy: URL, init: ProxyRequestInit) {
  const headers = originHeaders(target, init.headers);
  const authorization = authorizationHeader(proxy);

  if (authorization) {
    headers['Proxy-Authorization'] = authorization;
  }

  return send(proxy.protocol === 'https:' ? https : http, {
    protocol: proxy.protocol,
    hostname: proxy.hostname,
    port: proxy.port || (proxy.protocol === 'https:' ? 443 : 80),
    method: 'GET',
    path: `${target.origin}${target.pathname}${target.search}`,
    headers,
    signal: init.signal,
  });
}

async function requestHttps(target: URL, proxy: URL, init: ProxyRequestInit) {
  const socket = await openTunnel(target, proxy, init.signal);
  const secureSocket = tls.connect({
    socket,
    servername: net.isIP(target.hostname) ? undefined : target.hostname,
    host: target.hostname,
    ca: init.ca,
  });

  await new Promise<void>((resolve, reject) => {
    secureSocket.once('secureConnect', () => resolve());
    secureSocket.once('error', reject);
  });

  try {
    return await send(http, {
      createConnection: (_options, oncreate) => {
        oncreate(null, secureSocket);
        return secureSocket;
      },
      method: 'GET',
      path: `${target.pathname}${target.search}` || '/',
      headers: originHeaders(target, init.headers),
      signal: init.signal,
    });
  } finally {
    secureSocket.destroy();
  }
}

function openTunnel(target: URL, proxy: URL, signal: AbortSignal) {
  const headers: http.OutgoingHttpHeaders = { Host: `${target.hostname}:${target.port || 443}` };
  const authorization = authorizationHeader(proxy);

  if (authorization) {
    headers['Proxy-Authorization'] = authorization;
  }

  return new Promise<Duplex>((resolve, reject) => {
    const request = (proxy.protocol === 'https:' ? https : http).request({
      protocol: proxy.protocol,
      hostname: proxy.hostname,
      port: proxy.port || (proxy.protocol === 'https:' ? 443 : 80),
      method: 'CONNECT',
      path: `${target.hostname}:${target.port || 443}`,
      headers,
      signal,
    });

    request.once('connect', (response, socket, head) => {
      if (response.statusCode !== 200) {
        socket.destroy();
        reject(new Error(`Proxy CONNECT failed with HTTP ${response.statusCode ?? 0}.`));
        return;
      }

      if (head.length > 0) {
        socket.unshift(head);
      }

      resolve(socket);
    });
    request.once('error', reject);
    request.end();
  });
}

function send(transport: typeof http | typeof https, options: http.RequestOptions) {
  return new Promise<Response>((resolve, reject) => {
    const request = transport.request(options, (response) => {
      const chunks: Buffer[] = [];
      response.on('data', chunk => chunks.push(Buffer.from(chunk)));
      response.on('end', () => {
        const headers = new Headers();

        for (const [key, value] of Object.entries(response.headers)) {
          if (Array.isArray(value)) {
            for (const item of value) {
              headers.append(key, item);
            }
          } else if (value !== undefined) {
            headers.set(key, value);
          }
        }

        resolve(new Response(Buffer.concat(chunks), {
          status: response.statusCode ?? 0,
          statusText: response.statusMessage,
          headers,
        }));
      });
      response.on('error', reject);
    });

    request.once('error', reject);
    request.end();
  });
}
