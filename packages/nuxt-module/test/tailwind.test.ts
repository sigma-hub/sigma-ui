import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { $fetch, setup } from '@nuxt/test-utils/e2e';

const STYLESHEET_LINK_PATTERN = /<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g;
const INLINE_STYLE_PATTERN = /<style[^>]*>([\s\S]*?)<\/style>/g;

async function collectStyles(html: string): Promise<string> {
  const inlineStyles = [...html.matchAll(INLINE_STYLE_PATTERN)].map(match => match[1]);
  const linkedStyles = await Promise.all(
    [...html.matchAll(STYLESHEET_LINK_PATTERN)].map(match => $fetch<string>(match[1], { responseType: 'text' })),
  );

  return [...inlineStyles, ...linkedStyles].join('\n');
}

describe('ssr build of a Nuxt 4 project with Tailwind v4', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/tailwind', import.meta.url)),
  });

  it('server-renders components from the default @/components/ui directory', async () => {
    const html = await $fetch<string>('/');

    expect(html).toContain('<span class="fixture-badge bg-emerald-600 text-white"><!--[-->Fixture badge<!--]--></span>');
  });

  it('generates Tailwind utilities through @tailwindcss/vite', async () => {
    const styles = await collectStyles(await $fetch<string>('/'));

    expect(styles).toContain('.bg-emerald-600');
  });
});
