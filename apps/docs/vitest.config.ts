import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [vue()],
  resolve: {
    alias: {
      '@ui': fileURLToPath(new URL('../../packages/lib/src', import.meta.url)),
    },
  },
  test: {
    include: [
      '.vitepress/theme/utils/**/*.test.ts',
      '.vitepress/block-renderer/**/*.test.ts',
      '.vitepress/theme/plugins/**/*.test.ts',
      'test/**/*.test.ts',
    ],
  },
});
