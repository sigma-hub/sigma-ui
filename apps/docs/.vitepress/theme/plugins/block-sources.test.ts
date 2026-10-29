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

  it('emits light and dark token colours for the site theme switch', async () => {
    const html = await highlightBlockSource('const ready = true\n', 'example.ts');

    expect(html).toContain('--shiki-light:');
    expect(html).toContain('--shiki-dark:');
    expect(html).not.toMatch(/style="[^"]*(?<![-\w])color:/);
  });

  it('colours tokens by grammar instead of one flat colour', async () => {
    const colours = (html: string) => new Set(html.match(/--shiki-light:#[0-9a-fA-F]{6}/g));
    const vue = await highlightBlockSource('<template><div class="a" /></template>\n', 'Example.vue');
    const css = await highlightBlockSource('.a { color: red; }\n', 'example.css');

    expect(colours(vue).size).toBeGreaterThan(2);
    expect(colours(css).size).toBeGreaterThan(2);
  });
});
