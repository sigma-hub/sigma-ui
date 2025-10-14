import path from 'pathe';
import { expect, it } from 'vitest';

import { getConfig, getRawConfig } from '../../src/utils/get-config';

it('get raw config', async () => {
  expect(
    await getRawConfig(path.resolve(__dirname, '../fixtures/config-none')),
  ).toEqual(null);

  expect(
    await getRawConfig(path.resolve(__dirname, '../fixtures/config-partial')),
  ).toEqual({
    style: 'tailwind',
    framework: 'Vite',
    tailwind: {
      config: './tailwind.config.ts',
      css: './src/assets/css/tailwind.css',
      baseColor: 'grayscale',
    },
    tsConfigPath: './tsconfig.json',
    aliases: {
      components: '@/components',
      utils: '@/lib/utils',
    },
  });

  expect(
    getRawConfig(path.resolve(__dirname, '../fixtures/config-invalid')),
  ).rejects.toThrowError();
});

it('get config', async () => {
  expect(
    await getConfig(path.resolve(__dirname, '../fixtures/config-none')),
  ).toEqual(null);

  expect(
    getConfig(path.resolve(__dirname, '../fixtures/config-invalid')),
  ).rejects.toThrowError();

  expect(
    await getConfig(path.resolve(__dirname, '../fixtures/config-partial')),
  ).toEqual({
    style: 'tailwind',
    tailwind: {
      config: './tailwind.config.ts',
      css: './src/assets/css/tailwind.css',
      baseColor: 'grayscale',
    },
    aliases: {
      components: '@/components',
      utils: '@/lib/utils',
    },
    framework: 'Vite',
    tsConfigPath: './tsconfig.json',
    resolvedPaths: {
      tailwindConfig: path.resolve(
        __dirname,
        '../fixtures/config-partial',
        'tailwind.config.ts',
      ),
      tailwindCss: path.resolve(
        __dirname,
        '../fixtures/config-partial',
        './src/assets/css/tailwind.css',
      ),
      components: path.resolve(
        __dirname,
        '../fixtures/config-partial',
        './components',
      ),
      ui: path.resolve(
        __dirname,
        '../fixtures/config-partial',
        './components',
      ),
      utils: path.resolve(
        __dirname,
        '../fixtures/config-partial',
        './lib/utils',
      ),
    },
  });

  expect(
    await getConfig(path.resolve(__dirname, '../fixtures/config-full')),
  ).toEqual({
    style: 'css',
    tailwind: {
      config: 'tailwind.config.ts',
      baseColor: 'grayscale',
      css: 'src/app/globals.css',
      prefix: 'tw-',
    },
    aliases: {
      components: '~/components',
      ui: '~/ui',
      utils: '~/lib/utils',
    },
    framework: 'Vite',
    tsConfigPath: './tsconfig.json',
    resolvedPaths: {
      tailwindConfig: path.resolve(
        __dirname,
        '../fixtures/config-full',
        'tailwind.config.ts',
      ),
      tailwindCss: path.resolve(
        __dirname,
        '../fixtures/config-full',
        './src/app/globals.css',
      ),
      components: path.resolve(
        __dirname,
        '../fixtures/config-full',
        './src/components',
      ),
      ui: path.resolve(
        __dirname,
        '../fixtures/config-full',
        './src/ui',
      ),
      utils: path.resolve(
        __dirname,
        '../fixtures/config-full',
        './src/lib/utils',
      ),
    },
  });

  expect(
    await getConfig(path.resolve(__dirname, '../fixtures/config-js')),
  ).toEqual({
    style: 'tailwind',
    tailwind: {
      config: './tailwind.config.js',
      css: './src/assets/css/tailwind.css',
      baseColor: 'grayscale',
    },
    aliases: {
      components: '@/components',
      utils: '@/lib/utils',
    },
    framework: 'Vite',
    tsConfigPath: './tsconfig.json',
    resolvedPaths: {
      tailwindConfig: path.resolve(
        __dirname,
        '../fixtures/config-js',
        'tailwind.config.js',
      ),
      tailwindCss: path.resolve(
        __dirname,
        '../fixtures/config-js',
        './src/assets/css/tailwind.css',
      ),
      components: path.resolve(
        __dirname,
        '../fixtures/config-js',
        './components',
      ),
      ui: path.resolve(
        __dirname,
        '../fixtures/config-js',
        './components',
      ),
      utils: path.resolve(__dirname, '../fixtures/config-js', './lib/utils'),
    },
  });
});
