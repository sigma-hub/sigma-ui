import { describe, expect, it } from 'vitest';
import { highlightBlockSource, readBlockSourceFiles } from './block-sources';

describe('block source pre-render', () => {
  it('rewrites registry imports and keeps nested block files', () => {
    const files = readBlockSourceFiles();
    const login = files.find(file => file.style === 'tailwind' && file.blockName === 'login-simple' && file.relativePath === 'LoginSimple.vue');
    const nested = files.find(file => file.style === 'tailwind' && file.relativePath.includes('/'));

    expect(login?.raw).toContain('from \'@/components/ui/');
    expect(login?.raw).not.toContain('@ui/registry/');
    expect(nested?.relativePath).toMatch(/\.vue$|\.ts$/);
  });

  it('highlights source without leaving that work to the browser', async () => {
    const html = await highlightBlockSource('const ready = true\n', 'example.ts');

    expect(html).toContain('shiki');
    expect(html).toContain('ready');
  });
});
