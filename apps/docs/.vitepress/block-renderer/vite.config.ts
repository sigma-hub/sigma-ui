import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';

const docsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const docsSrc = path.resolve(docsRoot, 'src');
const repoRoot = path.resolve(docsRoot, '../..');

export default {
  root: docsSrc,
  publicDir: path.resolve(docsSrc, 'public'),
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: 'sigma-public-urls',
      resolveId(id: string) {
        if (!id.startsWith('/') || id.startsWith('/@')) {
          return;
        }

        const file = path.resolve(docsSrc, 'public', id.slice(1));

        if (fs.existsSync(file)) {
          return { id, external: true };
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(docsRoot, 'src'),
      '~': repoRoot,
      '@ui': path.resolve(repoRoot, 'packages/lib/src'),
    },
  },
  build: {
    outDir: path.resolve(docsRoot, '.vitepress/dist'),
    emptyOutDir: false,
    rollupOptions: {
      input: {
        'block-renderer': path.resolve(docsSrc, 'block-renderer/index.html'),
      },
    },
  },
};
