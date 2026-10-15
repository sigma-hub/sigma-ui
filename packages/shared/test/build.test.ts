import { describe, expect, it } from 'vitest';
import { resolve } from 'pathe';
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

describe('toPublicImports', () => {
  it('rewrites lib aliases to the default shadcn-style aliases', () => {
    const source = `import { Button } from '@ui/registry/css/ui/button';\nimport { cn } from "@ui/utils";`;

    expect(toPublicImports(source)).toBe(`import { Button } from '@/components/ui/button';\nimport { cn } from "@/lib/utils";`);
  });
});
