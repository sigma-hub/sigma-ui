import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'pathe';
import { describe, expect, it, vi } from 'vitest';
import { runMigrate } from '../../src/commands/migrate';
import { migrateConfig } from '../../src/utils/migrate/config';
import { rewriteComponentImports } from '../../src/utils/migrate/components';

vi.mock('consola');

function createProject(files: Record<string, string>) {
  const cwd = mkdtempSync(path.join(tmpdir(), 'sigma-ui-migrate-'));

  for (const [filePath, content] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(cwd, filePath)), { recursive: true });
    writeFileSync(path.join(cwd, filePath), content);
  }

  return cwd;
}

describe('migrateConfig', () => {
  it('upgrades the pre-1.4 config shape', () => {
    const { config, changes } = migrateConfig({
      style: 'tailwind',
      framework: 'Vite',
      tailwind: { config: './tailwind.config.ts', css: './src/assets/css/tailwind.css', baseColor: 'grayscale' },
      aliases: { components: '@/components', ui: '@/components/ui', utils: '@/lib/utils' },
    }, 'vite');

    expect(config).toMatchObject({
      $schema: 'https://sigma-ui.dev/schema.json',
      styleSystem: 'tailwind',
      framework: 'vite',
      cssPath: './src/assets/css/tailwind.css',
      baseColor: 'grayscale',
      tailwind: { config: './tailwind.config.ts' },
      aliases: { components: '@/components', utils: '@/lib/utils' },
      componentNaming: 'pascal-case',
    });
    expect(config.aliases).not.toHaveProperty('ui');
    expect(changes).toEqual(expect.arrayContaining(['style -> styleSystem', 'tailwind.css -> cssPath', 'framework: "Vite" -> "vite"']));
  });

  it('keeps a 1.4 config and only fills in 2.0 fields', () => {
    const { config, changes } = migrateConfig({
      styleSystem: 'css',
      framework: 'nuxt',
      cssPath: 'assets/css/main.css',
      baseColor: 'blue',
      tailwind: { config: '' },
      aliases: { components: '@/components/ui', utils: '' },
      componentNaming: 'kebab-case',
    }, 'vite');

    expect(config).toMatchObject({ styleSystem: 'css', framework: 'nuxt', baseColor: 'blue', componentNaming: 'kebab-case', tailwind: { config: '' } });
    expect(changes).toEqual(['$schema -> https://sigma-ui.dev/schema.json']);
  });

  it('falls back to the detected framework and reports configs it cannot migrate', () => {
    expect(migrateConfig({ styleSystem: 'css', framework: 'next', cssPath: 'a.css', aliases: { components: '@/ui' } }, 'astro').config.framework).toBe('astro');
    expect(() => migrateConfig({ framework: 'vite' }, 'vite')).toThrow(/could not be migrated/);
  });
});

describe('rewriteComponentImports', () => {
  it('rewrites only imports that point at renamed directories', () => {
    const source = [
      'import { Button } from \'@/components/ui/Button\';',
      'import { AlertDialog } from "@/components/ui/AlertDialog/index";',
      'import { Card } from \'@/components/ui/card\';',
      'import ButtonGroup from \'@/components/ui/ButtonGroup\';',
    ].join('\n');

    expect(rewriteComponentImports(source, '@/components/ui', [{ from: 'Button', to: 'button' }, { from: 'AlertDialog', to: 'alert-dialog' }])).toBe([
      'import { Button } from \'@/components/ui/button\';',
      'import { AlertDialog } from "@/components/ui/alert-dialog/index";',
      'import { Card } from \'@/components/ui/card\';',
      'import ButtonGroup from \'@/components/ui/ButtonGroup\';',
    ].join('\n'));
  });
});

describe('runMigrate', () => {
  it('migrates the config, renames PascalCase directories, and rewrites imports', async () => {
    const cwd = createProject({
      'package.json': JSON.stringify({ dependencies: { vue: '^3.5.0' } }),
      'tsconfig.json': JSON.stringify({ compilerOptions: { paths: { '@/*': ['./src/*'] } } }),
      'sigma-ui.config.json': JSON.stringify({
        styleSystem: 'tailwind',
        framework: 'vite',
        cssPath: 'src/assets/index.css',
        tailwind: { config: '' },
        aliases: { components: '@/components/ui', utils: '@/lib/utils' },
        componentNaming: 'pascal-case',
      }),
      'src/components/ui/Button/Button.vue': '<template><button /></template>\n',
      'src/components/ui/Button/index.ts': 'export { default as Button } from \'./Button.vue\';\n',
      'src/components/ui/AlertDialog/AlertDialog.vue': '<script setup lang="ts">\nimport { Button } from \'@/components/ui/Button\';\n</script>\n',
      'src/App.vue': '<script setup lang="ts">\nimport { Button } from \'@/components/ui/Button\';\n</script>\n',
    });

    const dryRun = await runMigrate(cwd, { yes: true, dryRun: true });
    expect(dryRun.renames).toEqual([{ from: 'AlertDialog', to: 'alert-dialog' }, { from: 'Button', to: 'button' }]);
    expect(existsSync(path.join(cwd, 'src/components/ui/Button'))).toBe(true);

    await runMigrate(cwd, { yes: true, dryRun: false });

    expect(readdirSync(path.join(cwd, 'src/components/ui')).sort()).toEqual(['alert-dialog', 'button']);
    expect(readFileSync(path.join(cwd, 'src/App.vue'), 'utf8')).toContain('from \'@/components/ui/button\'');
    expect(readFileSync(path.join(cwd, 'src/components/ui/alert-dialog/AlertDialog.vue'), 'utf8')).toContain('from \'@/components/ui/button\'');
    expect(JSON.parse(readFileSync(path.join(cwd, 'sigma-ui.config.json'), 'utf8')).$schema).toBe('https://sigma-ui.dev/schema.json');

    const secondRun = await runMigrate(cwd, { yes: true, dryRun: false });
    expect(secondRun.changes).toEqual([]);
    expect(secondRun.renames).toEqual([]);
  });

  it('fails without a config file', async () => {
    await expect(runMigrate(createProject({ 'package.json': '{}' }), { yes: true, dryRun: false })).rejects.toThrow(/No sigma-ui.config.json/);
  });
});
