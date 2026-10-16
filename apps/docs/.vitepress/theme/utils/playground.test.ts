import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { rawConfigSchema } from '@sigma-ui/shared/schemas';
import { describe, expect, it } from 'vitest';
import { assemblePlaygroundFiles, createPlaygroundStylesheet, packageName, playgroundRegistryNames, playgroundTargetPath, toRegistrySlug } from './playground';

const repoRoot = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '../../../../../');

const buttonItem = {
  name: 'button',
  type: 'registry:ui',
  dependencies: ['reka-ui@^2.2.1', 'class-variance-authority@^0.7.1'],
  files: [{
    path: 'ui/button/Button.vue',
    type: 'registry:ui',
    content: `import { Button } from '@/components/ui/button';\n`,
  }],
};

describe('playground project', () => {
  it('builds a Tailwind project from registry files without a JS config', () => {
    const files = assemblePlaygroundFiles({
      styleSystem: 'tailwind',
      componentName: 'Button',
      demoCode: `<script setup lang="ts">\nimport { Button } from '@ui/registry/tailwind/ui/button';\n</script>\n`,
      items: [buttonItem],
      css: '@import "tailwindcss";\n',
    });

    expect(files['tailwind.config.js']).toBeUndefined();
    expect(files['package.json'].content).not.toContain('@radix-ui/colors');
    expect(files['package.json'].content).not.toContain('sigma-ui add');
    expect(JSON.parse(files['package.json'].content).dependencies['reka-ui']).toBe('^2.2.1');
    expect(files['src/components/ui/button/Button.vue'].content).toContain('@/components/ui/button');
    expect(files['src/App.vue'].content).toContain(`from '@/components/ui/button'`);
    expect(JSON.parse(files['package.json'].content).dependencies['tw-animate-css']).toBe('latest');
    expect(files['src/lib/utils.ts']).toBeDefined();
    expect(rawConfigSchema.safeParse(JSON.parse(files['sigma-ui.config.json'].content)).success).toBe(true);
  });

  it('builds a CSS project with preflight and no Tailwind packages', () => {
    const files = assemblePlaygroundFiles({
      styleSystem: 'css',
      componentName: 'Button',
      demoCode: `<script setup lang="ts">\nimport { Button } from '@ui/registry/css/ui/button';\n</script>\n`,
      items: [{ ...buttonItem, dependencies: ['reka-ui@^2.2.1'] }],
      css: '@import "./preflight.css";\n',
      preflight: '/* reset */\n',
    });

    const packageJson = JSON.parse(files['package.json'].content) as { dependencies: Record<string, string>; devDependencies: Record<string, string> };

    expect(packageJson.dependencies['tailwindcss-animate']).toBeUndefined();
    expect(packageJson.devDependencies.tailwindcss).toBeUndefined();
    expect(files['src/assets/preflight.css'].content).toContain('reset');
    expect(files['vite.config.js'].content).not.toContain('tailwindcss');
    expect(rawConfigSchema.safeParse(JSON.parse(files['sigma-ui.config.json'].content)).success).toBe(true);
  });

  it('fills the theme stylesheet from the shared templates', () => {
    const tailwindCss = createPlaygroundStylesheet('tailwind');
    const plainCss = createPlaygroundStylesheet('css');

    expect(tailwindCss).toContain('--background:');
    expect(tailwindCss).toContain('@import "tw-animate-css"');
    expect(tailwindCss).toContain('--color-chart-1');
    expect(tailwindCss).not.toContain('@config');
    expect(tailwindCss).not.toContain('tailwindcss-animate');
    expect(plainCss).toContain('@import "./preflight.css"');
    expect(plainCss).toContain('--background:');
  });

  it('places block files under components/blocks', () => {
    expect(playgroundTargetPath(
      { name: 'login-simple', type: 'registry:block' },
      { path: 'blocks/login-simple/LoginSimple.vue', type: 'registry:component' },
    )).toBe('src/components/blocks/login-simple/LoginSimple.vue');
    expect(packageName('@vueuse/core@^12.0.0')).toBe('@vueuse/core');
  });
});

describe('playground registry names', () => {
  it('maps PascalCase component names to published slugs', () => {
    expect(toRegistrySlug('Button')).toBe('button');
    expect(toRegistrySlug('AlertDialog')).toBe('alert-dialog');
    expect(toRegistrySlug('TimeRangeField')).toBe('time-range-field');
    expect(toRegistrySlug('chart-bar')).toBe('chart-bar');
  });

  it('loads the components an example actually imports', () => {
    const buttonDemo = `import { Button } from '@ui/registry/tailwind/ui/button';\n`;

    expect(playgroundRegistryNames('Button', buttonDemo)).toEqual(['button']);
    expect(playgroundRegistryNames('ButtonSizes', buttonDemo)).toEqual(['button']);
    expect(playgroundRegistryNames('BarChart', `import { BarChart } from '@ui/registry/tailwind/ui/chart-bar';\n`)).toEqual(['chart-bar']);
    expect(playgroundRegistryNames('AlertDialog', [
      `import { AlertDialog } from '@ui/registry/tailwind/ui/alert-dialog';`,
      `import { Button } from '@ui/registry/tailwind/ui/button';`,
    ].join('\n'))).toEqual(['alert-dialog', 'button']);
    expect(playgroundRegistryNames('TypographyH1', '<template><h1>Title</h1></template>\n', ['typography'])).toEqual(['typography']);
    expect(playgroundRegistryNames('Button', '')).toEqual(['button']);
  });

  it('resolves every example to a slug published under public/r', () => {
    for (const styleSystem of ['tailwind', 'css'] as const) {
      const published = new Set(
        readdirSync(path.join(repoRoot, 'apps/docs/src/public/r', styleSystem))
          .filter(fileName => fileName.endsWith('.json') && fileName !== 'registry.json')
          .map(fileName => fileName.slice(0, -'.json'.length)),
      );
      const exampleDirectory = path.join(repoRoot, 'packages/lib/src/registry', styleSystem, 'example');

      for (const fileName of readdirSync(exampleDirectory).filter(entry => entry.endsWith('.vue'))) {
        const exampleName = fileName.slice(0, -'.vue'.length);
        const source = readFileSync(path.join(exampleDirectory, fileName), 'utf8');
        const imported = source.includes(`@ui/registry/${styleSystem}/ui/`);

        if (!imported) {
          continue;
        }

        const names = playgroundRegistryNames(exampleName, source);

        expect(names.length, `${styleSystem}/${exampleName}`).toBeGreaterThan(0);

        for (const name of names) {
          expect(published.has(name), `${styleSystem}/${exampleName} -> ${name}`).toBe(true);
        }

        const exampleSlug = toRegistrySlug(exampleName);

        if (!published.has(exampleSlug)) {
          expect(names, `${styleSystem}/${exampleName}`).not.toContain(exampleSlug);
        }
      }
    }
  });
});
