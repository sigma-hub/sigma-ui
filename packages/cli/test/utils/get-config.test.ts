import path from 'pathe';
import { describe, expect, it } from 'vitest';

import { getConfig, getDerivedAliases, getRawConfig } from '../../src/utils/get-config';

const fixture = (name: string) => path.resolve(__dirname, '../fixtures', name);

describe('getRawConfig', () => {
  it('returns null when the config file is missing', async () => {
    expect(await getRawConfig(fixture('config-none'))).toBeNull();
  });

  it('applies defaults to a partial config', async () => {
    expect(await getRawConfig(fixture('config-partial'))).toEqual({
      styleSystem: 'tailwind',
      framework: 'vite',
      tsConfigPath: 'tsconfig.json',
      setupTailwind: false,
      cssPath: './src/assets/css/tailwind.css',
      baseColor: 'grayscale',
      tailwind: { config: '' },
      aliases: {
        components: '@/components/ui',
        utils: '@/lib/utils',
      },
      generatePreflight: true,
      componentNaming: 'pascal-case',
    });
  });

  it('rejects an invalid config and points to migrate', async () => {
    await expect(getRawConfig(fixture('config-invalid'))).rejects.toThrowError(/sigma-ui migrate/);
  });
});

describe('getConfig', () => {
  it('returns null when the config file is missing', async () => {
    expect(await getConfig(fixture('config-none'))).toBeNull();
  });

  it('resolves aliases through tsconfig paths', async () => {
    const cwd = fixture('config-partial');
    const config = await getConfig(cwd);

    expect(config?.resolvedPaths).toEqual({
      cwd,
      tailwindConfig: '',
      tailwindCss: path.resolve(cwd, 'src/assets/css/tailwind.css'),
      utils: path.resolve(cwd, 'lib/utils'),
      components: path.resolve(cwd, 'components/ui'),
      blocks: path.resolve(cwd, 'components/blocks'),
      lib: path.resolve(cwd, 'lib'),
      composables: path.resolve(cwd, 'composables'),
    });
  });

  it('keeps explicit aliases and registries', async () => {
    const cwd = fixture('config-full');
    const config = await getConfig(cwd);

    expect(config).toMatchObject({
      styleSystem: 'css',
      componentNaming: 'kebab-case',
      tailwind: { prefix: 'tw-' },
      registries: { '@acme': 'https://acme.dev/r/{style}/{name}.json' },
    });
    expect(config?.resolvedPaths).toEqual({
      cwd,
      tailwindConfig: '',
      tailwindCss: path.resolve(cwd, 'src/app/globals.css'),
      utils: path.resolve(cwd, 'src/lib/utils'),
      components: path.resolve(cwd, 'src/components/ui'),
      blocks: path.resolve(cwd, 'src/blocks'),
      lib: path.resolve(cwd, 'src/lib'),
      composables: path.resolve(cwd, 'src/composables'),
    });
  });

  it('reads paths from jsconfig.json', async () => {
    const cwd = fixture('config-js');
    const config = await getConfig(cwd);

    expect(config?.resolvedPaths.tailwindConfig).toBe(path.resolve(cwd, 'tailwind.config.js'));
    expect(config?.resolvedPaths.components).toBe(path.resolve(cwd, 'components/ui'));
  });
});

describe('getDerivedAliases', () => {
  it('derives blocks, lib, and composables from components and utils', () => {
    expect(getDerivedAliases({ aliases: { components: '@/components/ui', utils: '@/lib/utils' } })).toEqual({
      blocks: '@/components/blocks',
      lib: '@/lib',
      composables: '@/composables',
    });
  });

  it('falls back to the source root when utils is empty', () => {
    expect(getDerivedAliases({ aliases: { components: '@/components/ui', utils: '' } }).lib).toBe('@/lib');
  });
});
