import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { describe, expect, it } from 'vitest';
import { join, resolve } from 'pathe';
import { crawlRegistry, findStyleMismatches, toPublicImports } from '../src/registry';
import type { RegistryItem } from '../src/schemas';

const LIB_REGISTRY_PATH = resolve(__dirname, '../../lib/src/registry');

describe('crawlRegistry', async () => {
  const registries = await crawlRegistry({ registryRoot: LIB_REGISTRY_PATH, styles: ['tailwind', 'css'] });

  const findItem = (style: string, name: string) => registries[style].find(item => item.name === name);

  it('detects registry dependencies from @ui/registry imports in both styles', () => {
    for (const style of ['tailwind', 'css']) {
      expect(findItem(style, 'pagination')?.registryDependencies).toContain('button');
      expect(findItem(style, 'avatar')?.registryDependencies).toContain('image');
      expect(findItem(style, 'chart-area')?.registryDependencies).toContain('chart');
    }
  });

  it('detects npm dependencies beyond a fixed allowlist', () => {
    const calendarDependencies = findItem('tailwind', 'calendar')?.dependencies ?? [];

    expect(calendarDependencies.some(dependency => dependency.startsWith('reka-ui@'))).toBe(true);
    expect(calendarDependencies.some(dependency => dependency.startsWith('lucide-vue-next'))).toBe(true);
  });

  it('builds blocks as multi-file registry:block items with metadata', () => {
    const block = findItem('tailwind', 'login-simple');

    expect(block?.type).toBe('registry:block');
    expect(block?.title).toBeTruthy();
    expect(block?.categories).toContain('login');
    expect(block?.files?.[0].path).toBe('blocks/login-simple/LoginSimple.vue');
    expect(block?.registryDependencies).toEqual(expect.arrayContaining(['button', 'card', 'input', 'label']));
  });
});

describe('findStyleMismatches', () => {
  const item = (name: string, paths: string[]): RegistryItem => ({
    name,
    type: 'registry:ui',
    files: paths.map(path => ({ path, type: 'registry:ui' })),
  });

  it('reports items and files that exist in only one style', () => {
    const mismatches = findStyleMismatches({
      tailwind: [item('button', ['ui/button/Button.vue', 'ui/button/index.ts']), item('card', ['ui/card/Card.vue'])],
      css: [item('button', ['ui/button/Button.vue']), item('badge', ['ui/badge/Badge.vue'])],
    });

    expect(mismatches).toEqual([
      'registry:ui button has different files in "tailwind" and "css"',
      'registry:ui card exists in "tailwind" but not in "css"',
      'registry:ui badge exists in "css" but not in "tailwind"',
    ]);
  });

  it('returns nothing when the trees match', () => {
    const items = [item('button', ['ui/button/Button.vue'])];
    expect(findStyleMismatches({ tailwind: items, css: items })).toEqual([]);
  });
});

describe('shared registry modules', () => {
  it('ships a shared module next to the component that imports it', async () => {
    const root = mkdtempSync(join(tmpdir(), 'sigma-ui-registry-'));
    const registryRoot = join(root, 'registry');
    const packageJsonPath = join(root, 'package.json');

    writeFileSync(packageJsonPath, JSON.stringify({ dependencies: { 'left-pad': '1.0.0' } }));

    for (const style of ['css', 'tailwind']) {
      const directory = join(registryRoot, style, 'ui', 'chart');
      mkdirSync(directory, { recursive: true });
      writeFileSync(join(directory, 'Chart.vue'), `<script setup lang="ts">
import { helper } from '@ui/registry/shared/ui/chart/helper';
</script>
<template><p>{{ helper }}</p></template>
`);
    }

    mkdirSync(join(registryRoot, 'shared', 'ui', 'chart'), { recursive: true });
    writeFileSync(join(registryRoot, 'shared', 'ui', 'chart', 'helper.ts'), 'import { pad } from \'left-pad\';\nexport const helper = pad;\n');

    const registries = await crawlRegistry({ registryRoot, styles: ['css', 'tailwind'], packageJsonPath });
    const chart = registries.css.find(item => item.name === 'chart');

    expect(chart?.files?.map(file => file.path)).toEqual([
      'ui/chart/Chart.vue',
      'ui/chart/helper.ts',
    ]);
    expect(chart?.dependencies).toContain('left-pad@1.0.0');
    expect(registries.tailwind.find(item => item.name === 'chart')?.files?.map(file => file.path)).toEqual(chart?.files?.map(file => file.path));
  });
});

describe('toPublicImports', () => {
  it('rewrites lib aliases to the default shadcn-style aliases', () => {
    const source = `import { Button } from '@ui/registry/css/ui/button';\nimport { createChartSingleTooltipTemplate } from '@ui/registry/shared/ui/chart/tooltip-template';\nimport { cn } from "@ui/utils";`;

    expect(toPublicImports(source)).toBe(`import { Button } from '@/components/ui/button';\nimport { createChartSingleTooltipTemplate } from '@/components/ui/chart/tooltip-template';\nimport { cn } from "@/lib/utils";`);
  });
});
