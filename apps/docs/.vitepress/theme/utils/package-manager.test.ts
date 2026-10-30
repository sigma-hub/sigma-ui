import { describe, expect, it } from 'vitest';
import { convertNpmCommand } from './package-manager';

describe('convertNpmCommand', () => {
  it('converts npx to the dlx runners', () => {
    expect(convertNpmCommand('npx sigma-ui@latest add button')).toEqual({
      npm: 'npx sigma-ui@latest add button',
      pnpm: 'pnpm dlx sigma-ui@latest add button',
      yarn: 'yarn dlx sigma-ui@latest add button',
      bun: 'bunx --bun sigma-ui@latest add button',
    });
  });

  it('converts installs and keeps dev flags', () => {
    expect(convertNpmCommand('npm install -D tailwindcss @tailwindcss/vite')).toEqual({
      npm: 'npm install -D tailwindcss @tailwindcss/vite',
      pnpm: 'pnpm add -D tailwindcss @tailwindcss/vite',
      yarn: 'yarn add -D tailwindcss @tailwindcss/vite',
      bun: 'bun add -D tailwindcss @tailwindcss/vite',
    });
    expect(convertNpmCommand('npm i --save-dev @types/node')?.yarn).toBe('yarn add -D @types/node');
  });

  it('keeps a bare install an install and maps global installs', () => {
    expect(convertNpmCommand('npm install')).toMatchObject({ pnpm: 'pnpm install', yarn: 'yarn install', bun: 'bun install' });
    expect(convertNpmCommand('npm install -g sigma-ui')).toMatchObject({
      pnpm: 'pnpm add -g sigma-ui',
      yarn: 'yarn global add sigma-ui',
      bun: 'bun add -g sigma-ui',
    });
  });

  it('maps run and create, dropping the npm `--` separator', () => {
    expect(convertNpmCommand('npm run dev -- --port 3000')).toMatchObject({
      pnpm: 'pnpm dev --port 3000',
      yarn: 'yarn dev --port 3000',
      bun: 'bun run dev --port 3000',
    });
    expect(convertNpmCommand('npm create vite@latest my-vue-app -- --template vue')).toMatchObject({
      npm: 'npm create vite@latest my-vue-app -- --template vue',
      pnpm: 'pnpm create vite@latest my-vue-app --template vue',
      yarn: 'yarn create vite@latest my-vue-app --template vue',
      bun: 'bun create vite@latest my-vue-app --template vue',
    });
  });

  it('converts every line of a multi-line command', () => {
    expect(convertNpmCommand('npm install -D tailwindcss @tailwindcss/vite\nnpm install tw-animate-css\n')).toMatchObject({
      pnpm: 'pnpm add -D tailwindcss @tailwindcss/vite\npnpm add tw-animate-css',
      bun: 'bun add -D tailwindcss @tailwindcss/vite\nbun add tw-animate-css',
    });
  });

  it('leaves everything else alone', () => {
    expect(convertNpmCommand('laravel new my-app --git')).toBeUndefined();
    expect(convertNpmCommand('npm ci')).toBeUndefined();
    expect(convertNpmCommand('npx sigma-ui init\n# then\ncd app')).toBeUndefined();
    expect(convertNpmCommand('npmx')).toBeUndefined();
    expect(convertNpmCommand('')).toBeUndefined();
  });
});
