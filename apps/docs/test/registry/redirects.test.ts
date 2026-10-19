import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const PUBLIC_ROOT = fileURLToPath(new URL('../../src/public', import.meta.url));
const BLOCK_MANIFEST = fileURLToPath(new URL('../../../../packages/lib/src/registry/blocks.json', import.meta.url));

const redirects = readFileSync(`${PUBLIC_ROOT}/_redirects`, 'utf8')
  .split('\n')
  .map(line => line.trim())
  .filter(line => line && !line.startsWith('#'))
  .map((line) => {
    const [from = '', to = '', status = ''] = line.split(/\s+/);
    return { from, to, status };
  });
const registryRedirects = redirects.filter(redirect => redirect.from.startsWith('/r/'));

describe('_redirects', () => {
  it('uses permanent redirects with a source and a target', () => {
    for (const redirect of redirects) {
      expect(redirect, JSON.stringify(redirect)).toMatchObject({ from: expect.stringMatching(/^\//), to: expect.stringMatching(/^\//), status: '301' });
    }
  });

  it('points renamed registry items at items that exist', () => {
    expect(registryRedirects.length).toBeGreaterThan(0);

    for (const { from, to } of registryRedirects) {
      expect(existsSync(`${PUBLIC_ROOT}${to}`), `${from} -> ${to}`).toBe(true);
      // The registry build prunes old items, so the old name must not be served as a stale file.
      expect(existsSync(`${PUBLIC_ROOT}${from}`), `${from} is still in the registry`).toBe(false);
    }
  });

  it('gives every block a category-prefixed name', () => {
    const blocks = JSON.parse(readFileSync(BLOCK_MANIFEST, 'utf8')) as { name: string; categories: string[] }[];
    const prefixes = ['dashboard', 'login', 'signup', 'settings', 'table'];

    expect(blocks.filter(block => !prefixes.some(prefix => block.name.startsWith(`${prefix}-`))).map(block => block.name)).toEqual([]);
  });
});
