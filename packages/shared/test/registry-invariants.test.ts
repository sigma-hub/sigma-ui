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
});
