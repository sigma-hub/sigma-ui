import { describe, expect, it } from 'vitest';
import { classifyImportSources, getPackageName } from '../src/registry/dependencies';
import { parsePnpmCatalogs } from '../src/registry/package-versions';

describe('getPackageName', () => {
  it('returns the package name for bare and scoped imports', () => {
    expect(getPackageName('reka-ui')).toBe('reka-ui');
    expect(getPackageName('@vueuse/core')).toBe('@vueuse/core');
    expect(getPackageName('date-fns/locale')).toBe('date-fns');
    expect(getPackageName('@unovis/ts/types')).toBe('@unovis/ts');
  });

  it('ignores aliases, relative paths, builtins, and vue', () => {
    expect(getPackageName('./Button.vue')).toBeNull();
    expect(getPackageName('@ui/utils')).toBeNull();
    expect(getPackageName('@/components/ui/button')).toBeNull();
    expect(getPackageName('node:fs')).toBeNull();
    expect(getPackageName('path')).toBeNull();
    expect(getPackageName('vue')).toBeNull();
  });
});

describe('classifyImportSources', () => {
  it('maps @ui/registry imports to registry dependencies for both styles', () => {
    const result = classifyImportSources([
      '@ui/registry/tailwind/ui/button',
      '@ui/registry/css/ui/image/Image.vue',
      '@ui/registry/tailwind/ui/pagination',
    ], { itemName: 'pagination' });

    expect(result.registryDependencies).toEqual(['button', 'image']);
  });

  it('adds npm dependencies with versions and companion packages', () => {
    const result = classifyImportSources(
      ['reka-ui', '@lucide/vue', '@unovis/vue', 'vue', '@ui/utils'],
      { packageVersions: { 'reka-ui': '^2.2.1', '@unovis/vue': '^1.5.0', '@unovis/ts': '^1.5.0', '@lucide/vue': 'catalog:' } },
    );

    expect(result.dependencies).toEqual(['@lucide/vue', '@unovis/ts@^1.5.0', '@unovis/vue@^1.5.0', 'reka-ui@^2.2.1']);
  });
});

describe('parsePnpmCatalogs', () => {
  it('reads the default and named catalogs', () => {
    const catalogs = parsePnpmCatalogs([
      'packages:',
      '  - packages/*',
      'catalog:',
      '  reka-ui: ^2.11.0',
      '  \'@vueuse/core\': "^13.0.0"',
      'catalogs:',
      '  legacy:',
      '    vue: 3.4.0',
    ].join('\n'));

    expect(catalogs).toEqual({
      default: { 'reka-ui': '^2.11.0', '@vueuse/core': '^13.0.0' },
      legacy: { vue: '3.4.0' },
    });
  });
});
