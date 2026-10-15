import { rawConfigSchema } from '@sigma-ui/shared/schemas';
import { describe, expect, it } from 'vitest';
import { assemblePlaygroundFiles, createPlaygroundStylesheet, packageName, playgroundTargetPath } from './playground';

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
    expect(tailwindCss).not.toContain('@config');
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
