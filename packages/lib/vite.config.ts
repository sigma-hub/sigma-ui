import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  root: __dirname,
  plugins: [
    vue(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, './src'),
    },
    preserveSymlinks: true,
  },
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
  },
});
