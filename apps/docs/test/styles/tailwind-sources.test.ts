import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const stylesDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../.vitepress/theme/styles');
const registryTailwindDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../packages/lib/src/registry/tailwind');

describe('docs Tailwind sources', () => {
  // The docs and the preview frames share main.css. Without this source, classes used only in
  // registry examples and blocks are never generated, and the Tailwind previews render unstyled.
  it('scans the Tailwind registry for classes', () => {
    const css = readFileSync(resolve(stylesDir, 'main.css'), 'utf8');
    const sources = [...css.matchAll(/@source\s+"([^"]+)"/g)].map(match => resolve(stylesDir, match[1]));

    expect(sources).toContain(registryTailwindDir);
    expect(existsSync(registryTailwindDir)).toBe(true);
  });
});
