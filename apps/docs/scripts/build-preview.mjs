import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const pnpmDir = path.join(repoRoot, 'node_modules/.pnpm');
const viteDir = readdirSync(pnpmDir).find(name => name.startsWith('vite@5.'));

if (!viteDir) {
  throw new Error('Vite 5 is not installed');
}

const viteBin = path.join(pnpmDir, viteDir, 'node_modules/vite/bin/vite.js');
const result = spawnSync(process.execPath, [
  viteBin,
  'build',
  '--config',
  '.vitepress/block-renderer/vite.config.ts',
], {
  stdio: 'inherit',
  cwd: path.resolve(repoRoot, 'apps/docs'),
});

process.exit(result.status ?? 1);
