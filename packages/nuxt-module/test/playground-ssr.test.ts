import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { $fetch, setup } from '@nuxt/test-utils/e2e';

function errorText(error: unknown): string {
  if (error instanceof Error) {
    return `${error.message}\n${'data' in error ? String(error.data) : ''}`;
  }

  return String(error);
}

describe('ssr build of the playground components', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
  });

  it('server-renders the installed components without touching document during setup', async () => {
    let html = '';

    try {
      html = await $fetch<string>('/');
    } catch (error) {
      const details = errorText(error);

      if (details.includes('document')) {
        throw new Error(`SSR setup touched document.\n${details}`, { cause: error });
      }

      throw error;
    }

    expect(html).not.toContain('document is not defined');
    expect(html).toContain('sigma-ui-nuxt playground');
    expect(html).toContain('<!--[--> Nuxt 4 <!--]-->');
    expect(html).toContain('data-slot="button"');
    expect(html).toContain('<!--[-->Default<!--]-->');
    expect(html).toContain('<!--[-->Auto-imported components<!--]-->');
    expect(html).toContain('<!--[-->How are components registered?<!--]-->');
  });
});
