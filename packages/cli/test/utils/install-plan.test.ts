import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'pathe';
import { beforeAll, describe, expect, it } from 'vitest';
import type { Config, RegistryItem } from '../../src/schemas';
import { createInstallPlan, excludeInstalledDependencies, findIncompatibleDependencies, getCompatibilityKey, getFileTargetPath, resolveRegistryFileTarget } from '../../src/utils/install-plan';

function createConfig(cwd: string, overrides: Partial<Config> = {}): Config {
  return {
    styleSystem: 'tailwind',
    framework: 'vite',
    tsConfigPath: 'tsconfig.json',
    setupTailwind: false,
    cssPath: 'src/assets/index.css',
    baseColor: 'grayscale',
    tailwind: { config: '' },
    aliases: { components: '@/components/ui', utils: '@/lib/utils' },
    generatePreflight: false,
    componentNaming: 'pascal-case',
    resolvedPaths: {
      cwd,
      tailwindConfig: '',
      tailwindCss: path.join(cwd, 'src/assets/index.css'),
      utils: path.join(cwd, 'src/lib/utils'),
      components: path.join(cwd, 'src/components/ui'),
      blocks: path.join(cwd, 'src/components/blocks'),
      lib: path.join(cwd, 'src/lib'),
      composables: path.join(cwd, 'src/composables'),
    },
    ...overrides,
  };
}

const cwd = '/project';
const config = createConfig(cwd);

describe('getFileTargetPath', () => {
  it('places ui files in a kebab-case directory named after the item', () => {
    const item: RegistryItem = { name: 'button', type: 'registry:ui', files: [] };

    expect(getFileTargetPath({ path: 'ui/button/Button.vue', type: 'registry:ui' }, item, config)).toBe('/project/src/components/ui/button/Button.vue');
    expect(getFileTargetPath({ path: 'ui/button/Button.vue', type: 'registry:ui' }, item, createConfig(cwd, { componentNaming: 'kebab-case' }))).toBe('/project/src/components/ui/button/button.vue');
  });

  it('keeps nested block files under the blocks directory', () => {
    const item: RegistryItem = { name: 'dashboard-orders', type: 'registry:block', files: [] };

    expect(getFileTargetPath({ path: 'blocks/dashboard-orders/components/OrdersTable.vue', type: 'registry:component' }, item, config))
      .toBe('/project/src/components/blocks/dashboard-orders/components/OrdersTable.vue');
    expect(getFileTargetPath({ path: 'blocks/dashboard-orders/data.ts', type: 'registry:lib' }, item, config))
      .toBe('/project/src/components/blocks/dashboard-orders/data.ts');
  });

  it('puts an example and its sibling files in one folder named after the item', () => {
    const item: RegistryItem = { name: 'area-chart-custom-tooltip', type: 'registry:example', files: [] };

    expect(getFileTargetPath({ path: 'example/AreaChartCustomTooltip.vue', type: 'registry:example' }, item, config))
      .toBe('/project/src/components/examples/area-chart-custom-tooltip/AreaChartCustomTooltip.vue');
    expect(getFileTargetPath({ path: 'example/CustomChartTooltip.vue', type: 'registry:example' }, item, config))
      .toBe('/project/src/components/examples/area-chart-custom-tooltip/CustomChartTooltip.vue');
  });

  it('routes lib and composable files to their own directories', () => {
    const lib: RegistryItem = { name: 'format', type: 'registry:lib', files: [] };
    const composable: RegistryItem = { name: 'use-theme', type: 'registry:composable', files: [] };

    expect(getFileTargetPath({ path: 'lib/format.ts', type: 'registry:lib' }, lib, config)).toBe('/project/src/lib/format.ts');
    expect(getFileTargetPath({ path: 'composables/useTheme.ts', type: 'registry:composable' }, composable, config)).toBe('/project/src/composables/useTheme.ts');
  });

  it('prefers explicit targets and path overrides', () => {
    const item: RegistryItem = { name: 'button', type: 'registry:ui', files: [] };

    expect(getFileTargetPath({ path: 'ui/button/index.ts', type: 'registry:ui', target: '~/app/button.ts' }, item, config)).toBe('/project/app/button.ts');
    expect(getFileTargetPath({ path: 'ui/button/index.ts', type: 'registry:ui' }, item, config, '/elsewhere')).toBe('/elsewhere/button/index.ts');
  });

  it('rejects registry targets that escape the project', () => {
    const item: RegistryItem = { name: 'button', type: 'registry:ui', files: [] };

    expect(() => resolveRegistryFileTarget(cwd, '/etc/passwd')).toThrow(/must be a path inside the project/);
    expect(() => resolveRegistryFileTarget(cwd, '../secret.ts')).toThrow(/must not contain "\.\."/);
    expect(() => resolveRegistryFileTarget(cwd, 'ui/../../secret.ts')).toThrow(/must not contain "\.\."/);
    expect(() => resolveRegistryFileTarget(cwd, '~/../../etc/passwd')).toThrow(/must not contain "\.\."/);
    expect(() => getFileTargetPath({ path: 'ui/button/Button.vue', type: 'registry:ui', target: '../outside.vue' }, item, config))
      .toThrow(/must not contain "\.\."/);
    expect(resolveRegistryFileTarget(cwd, 'src/components/ui/button/Button.vue')).toBe('/project/src/components/ui/button/Button.vue');
  });
});

describe('createInstallPlan', () => {
  let projectRoot: string;

  beforeAll(() => {
    projectRoot = mkdtempSync(path.join(tmpdir(), 'sigma-ui-plan-'));
    mkdirSync(path.join(projectRoot, 'src/components/ui/button'), { recursive: true });
    writeFileSync(path.join(projectRoot, 'src/components/ui/button/index.ts'), 'export { default as Button } from \'./Button.vue\';\n');
    writeFileSync(path.join(projectRoot, 'src/components/ui/button/Button.vue'), '<template>old</template>\n');
  });

  it('transforms content and reports create, update, and unchanged files', async () => {
    const button: RegistryItem = {
      name: 'button',
      type: 'registry:ui',
      dependencies: ['reka-ui@^2.0.0'],
      files: [
        { path: 'ui/button/index.ts', type: 'registry:ui', content: 'export { default as Button } from \'./Button.vue\';\n' },
        { path: 'ui/button/Button.vue', type: 'registry:ui', content: '<script setup lang="ts">\nimport { cn } from \'@/lib/utils\';\n</script>\n' },
      ],
    };
    const card: RegistryItem = {
      name: 'card',
      type: 'registry:ui',
      dependencies: ['reka-ui', '@lucide/vue@^0.400.0'],
      files: [{ path: 'ui/card/Card.vue', type: 'registry:ui', content: '<template />\n' }],
    };

    const plan = await createInstallPlan(
      [
        { item: button, location: { specifier: 'button', source: 'button.json', headers: {}, namespace: null }, requested: false },
        { item: card, location: { specifier: 'card', source: 'card.json', headers: {}, namespace: null }, requested: true },
      ],
      createConfig(projectRoot, { aliases: { components: '@/components/ui', utils: '@/utils/cn' } }),
    );

    expect(plan.files.map(file => [path.relative(projectRoot, file.targetPath), file.status])).toEqual([
      ['src/components/ui/button/index.ts', 'unchanged'],
      ['src/components/ui/button/Button.vue', 'update'],
      ['src/components/ui/card/Card.vue', 'create'],
    ]);
    expect(plan.files[1].content).toContain('import { cn } from \'@/utils/cn\'');
    expect(plan.dependencies).toEqual(['@lucide/vue@^0.400.0', 'reka-ui@^2.0.0']);
  });

  it('fails when a registry file has no content', async () => {
    const item: RegistryItem = { name: 'empty', type: 'registry:ui', files: [{ path: 'ui/empty/Empty.vue', type: 'registry:ui' }] };

    await expect(createInstallPlan([{ item, location: { specifier: 'empty', source: 'empty.json', headers: {}, namespace: null }, requested: true }], config))
      .rejects.toThrow(/has no content/);
  });
});

describe('excludeInstalledDependencies', () => {
  it('drops packages that are already installed regardless of version', () => {
    expect(excludeInstalledDependencies(['reka-ui@^2.0.0', '@vueuse/core@^12.0.0', 'clsx'], new Set(['reka-ui', 'clsx'])))
      .toEqual(['@vueuse/core@^12.0.0']);
  });
});

describe('getCompatibilityKey', () => {
  it.each([
    ['^4.6.7', '4'],
    ['~3.25.76', '3'],
    ['3.25.76', '3'],
    ['>=2.1.0', '2'],
    ['v1.2.3', '1'],
    ['4.0.0-beta.1', '4'],
    ['^0.3.1', '0.3'],
    ['5', '5'],
    ['*', undefined],
    ['latest', undefined],
    ['workspace:*', undefined],
    ['^3.0.0 || ^4.0.0', undefined],
  ])('%s -> %s', (range, key) => {
    expect(getCompatibilityKey(range)).toBe(key);
  });
});

describe('findIncompatibleDependencies', () => {
  it('reports installed packages on a different major version', () => {
    const installed = new Map([
      ['zod', '3.25.76'],
      ['reka-ui', '2.11.0'],
      ['@vueuse/core', '^12.0.0'],
      ['local-pkg', 'workspace:*'],
    ]);

    expect(findIncompatibleDependencies(['zod@^4.6.7', 'reka-ui@^2.0.0', '@vueuse/core@^14.0.0', 'local-pkg@^1.0.0', 'clsx', 'vee-validate@^4.15.1'], installed))
      .toEqual([
        { dependency: 'zod@^4.6.7', name: 'zod', required: '^4.6.7', installed: '3.25.76' },
        { dependency: '@vueuse/core@^14.0.0', name: '@vueuse/core', required: '^14.0.0', installed: '^12.0.0' },
      ]);
  });
});
