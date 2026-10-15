import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'pathe';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_REGISTRY_URL,
  REGISTRY_URL_ENV,
  resolveRegistryLocation,
  resolveRegistryTree,
} from '../../src/utils/registry';

function writeItem(root: string, style: string, item: Record<string, unknown>) {
  mkdirSync(path.join(root, style), { recursive: true });
  writeFileSync(path.join(root, style, `${item.name}.json`), JSON.stringify(item));
}

describe('resolveRegistryLocation', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('builds default registry URLs from the style system', () => {
    vi.stubEnv(REGISTRY_URL_ENV, '');
    expect(resolveRegistryLocation('button', { cwd: '/project', styleSystem: 'css' }).source).toBe(`${DEFAULT_REGISTRY_URL}/css/button.json`);
  });

  it('honors the registry URL environment override, including local paths', () => {
    vi.stubEnv(REGISTRY_URL_ENV, 'http://localhost:5173/r/');
    expect(resolveRegistryLocation('button', { cwd: '/project', styleSystem: 'tailwind' }).source).toBe('http://localhost:5173/r/tailwind/button.json');

    vi.stubEnv(REGISTRY_URL_ENV, '/srv/registry');
    expect(resolveRegistryLocation('button', { cwd: '/project', styleSystem: 'tailwind' }).source).toBe('/srv/registry/tailwind/button.json');
  });

  it('resolves URLs and namespaced items with params and headers', () => {
    vi.stubEnv('ACME_TOKEN', 'secret');
    const context = {
      cwd: '/project',
      styleSystem: 'css',
      registries: {
        '@acme': { url: 'https://acme.dev/r/{style}/{name}.json', params: { version: 'latest' }, headers: { Authorization: 'Bearer ${ACME_TOKEN}' } },
        '@local': './registry/{name}.json',
      },
    };

    expect(resolveRegistryLocation('https://example.com/r/card.json', context).source).toBe('https://example.com/r/card.json');

    const namespaced = resolveRegistryLocation('@acme/login-form', context);
    expect(namespaced.source).toBe('https://acme.dev/r/css/login-form.json?version=latest');
    expect(namespaced.headers).toEqual({ Authorization: 'Bearer secret' });

    expect(resolveRegistryLocation('@local/hero', context).source).toBe('/project/registry/hero.json');
    expect(() => resolveRegistryLocation('@unknown/hero', context)).toThrow(/Unknown registry namespace/);
  });
});

describe('resolveRegistryTree', () => {
  let registryRoot: string;

  beforeAll(() => {
    registryRoot = mkdtempSync(path.join(tmpdir(), 'sigma-ui-registry-'));
    const file = (name: string) => [{ path: `ui/${name}/index.ts`, type: 'registry:ui', content: '' }];

    writeItem(registryRoot, 'tailwind', { name: 'button', type: 'registry:ui', files: file('button') });
    writeItem(registryRoot, 'tailwind', { name: 'dialog', type: 'registry:ui', registryDependencies: ['button'], files: file('dialog') });
    writeItem(registryRoot, 'tailwind', { name: 'alert-dialog', type: 'registry:ui', registryDependencies: ['button', 'dialog'], files: file('alert-dialog') });
    writeItem(registryRoot, 'tailwind', { name: 'login', type: 'registry:block', registryDependencies: ['alert-dialog', './vendor/extra.json'], files: [] });
    mkdirSync(path.join(registryRoot, 'vendor'));
    writeFileSync(path.join(registryRoot, 'vendor/extra.json'), JSON.stringify({ name: 'extra', type: 'registry:lib', files: [] }));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('resolves registry dependencies depth-first without duplicates', async () => {
    vi.stubEnv(REGISTRY_URL_ENV, registryRoot);
    const tree = await resolveRegistryTree(['alert-dialog', 'dialog'], { cwd: registryRoot, styleSystem: 'tailwind' });

    expect(tree.map(entry => entry.item.name)).toEqual(['button', 'dialog', 'alert-dialog']);
    expect(tree.filter(entry => entry.requested).map(entry => entry.item.name)).toEqual(['dialog', 'alert-dialog']);
  });

  it('follows local file dependencies', async () => {
    vi.stubEnv(REGISTRY_URL_ENV, registryRoot);
    const tree = await resolveRegistryTree(['login'], { cwd: registryRoot, styleSystem: 'tailwind' });

    expect(tree.map(entry => entry.item.name)).toEqual(['button', 'dialog', 'alert-dialog', 'extra', 'login']);
  });

  it('reports missing items clearly', async () => {
    vi.stubEnv(REGISTRY_URL_ENV, registryRoot);
    await expect(resolveRegistryTree(['missing'], { cwd: registryRoot, styleSystem: 'tailwind' })).rejects.toThrow(/"missing" was not found/);
  });
});
