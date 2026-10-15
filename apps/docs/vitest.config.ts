import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  resolve: {
    alias: {
      '@ui': fileURLToPath(new URL('../../packages/lib/src', import.meta.url)),
    },
  },
  test: {
    include: ['.vitepress/theme/utils/**/*.test.ts'],
  },
});
