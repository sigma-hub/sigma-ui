import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { $fetch, setup } from '@nuxt/test-utils/e2e';

describe('ssr build with a prefix and the fallback utils', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  });

  it('server-renders prefixed components registered from index.ts exports', async () => {
    const html = await $fetch<string>('/');

    expect(html).toContain('<button type="button" class="fixture-button fixture-button--ssr"><!--[-->Fixture button<!--]--></button>');
    expect(html).toContain('<div class="fixture-button-group"></div>');
    expect(html).not.toMatch(/<uifixturebutton/i);
  });
});
