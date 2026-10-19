import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'pathe';
import { describe, expect, it } from 'vitest';

const registryRoot = resolve(__dirname, '../../lib/src/registry');
const VALUE_UPDATER_IMPORT = /import\s*\{[^}]*\bvalueUpdater\b[^}]*\}\s*from\s*['"][^'"]*utils['"]/;
const COMPUTED_DELEGATED_ATTRS = /const\s+delegatedAttrs\s*=\s*computed\s*\(/;

function listFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name);
    return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
  });
}

describe('installed registry sources', () => {
  const files = ['css', 'tailwind'].flatMap(style => listFiles(join(registryRoot, style)).map(file => ({
    style,
    file,
    relativePath: relative(join(registryRoot, style), file),
    source: readFileSync(file, 'utf8'),
  })));

  it('does not import valueUpdater from utils', () => {
    const offenders = files
      .filter(entry => VALUE_UPDATER_IMPORT.test(entry.source))
      .map(entry => `${entry.style}/${entry.relativePath}`);

    expect(offenders).toEqual([]);
  });

  it('does not cache delegated attrs in a computed', () => {
    const offenders = files
      .filter(entry => COMPUTED_DELEGATED_ATTRS.test(entry.source))
      .map(entry => `${entry.style}/${entry.relativePath}`);

    expect(offenders).toEqual([]);
  });

  it('only names real CSS properties in CSS style transitions', () => {
    // Tailwind utility names such as `colors` or `shadow` are not CSS properties, and the browser drops them.
    const offenders = files
      .filter(entry => entry.style === 'css' && entry.file.endsWith('.vue'))
      .flatMap(entry => [...entry.source.matchAll(/\btransition(?:-property)?\s*:([^;]+);/g)]
        .filter(([, value]) => /(?:^|[\s,])(?:colors|shadow)(?=[\s,]|$)/.test(value))
        .map(([declaration]) => `${entry.relativePath}: ${declaration.trim()}`));

    expect(offenders).toEqual([]);
  });

  it('puts every CSS style component style in the components cascade layer and declares the layer order first', () => {
    const offenders = files
      .filter(entry => entry.style === 'css' && entry.file.endsWith('.vue'))
      .flatMap(entry => [...entry.source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
        .filter(([, body]) => !/^\s*@layer base, components;\s*@layer components \{[\s\S]*\}\s*$/.test(body))
        .map(() => entry.relativePath));

    expect(offenders).toEqual([]);
  });
});
