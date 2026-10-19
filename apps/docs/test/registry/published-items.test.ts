import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const REGISTRY_ROOT = fileURLToPath(new URL('../../src/public/r', import.meta.url));

const items = ['css', 'tailwind'].flatMap(style => readdirSync(`${REGISTRY_ROOT}/${style}`)
  .filter(name => name.endsWith('.json') && name !== 'registry.json' && name !== 'index.json')
  .map(name => ({ style, ...JSON.parse(readFileSync(`${REGISTRY_ROOT}/${style}/${name}`, 'utf8')) as { name: string; type: string; files?: { path: string; content?: string }[] } })));

describe('published registry items', () => {
  it('has items for both styles', () => {
    expect(items.filter(item => item.style === 'css').length).toBeGreaterThan(100);
    expect(items.filter(item => item.style === 'tailwind').length).toBeGreaterThan(100);
  });

  it('only imports sibling files from examples, which the CLI installs into one folder', () => {
    const offenders = items
      .filter(item => item.type === 'registry:example')
      .flatMap(item => (item.files ?? [])
        .filter(file => /\b(?:from|import)\s*\(?\s*['"]\.\.\//.test(file.content ?? '') || /['"]\.\/[^'"]*\//.test((file.content ?? '').match(/from\s*['"]\.\/[^'"]+['"]/g)?.join('\n') ?? ''))
        .map(file => `${item.style}/${item.name}: ${file.path}`));

    expect(offenders).toEqual([]);
  });

  it('does not reference files from the docs public directory', () => {
    const offenders = items
      .flatMap(item => (item.files ?? [])
        .filter(file => /["'`]\/placeholder\.svg["'`]/.test(file.content ?? ''))
        .map(file => `${item.style}/${item.name}: ${file.path}`));

    expect(offenders).toEqual([]);
  });
});
