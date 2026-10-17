import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'pathe';
import { describe, expect, it } from 'vitest';
import { assertProjectIsMigrated } from '../../src/commands/add';
import type { Config } from '../../src/schemas';

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

function createProject(files: Record<string, string>) {
  const cwd = mkdtempSync(path.join(tmpdir(), 'sigma-ui-add-'));

  for (const [filePath, content] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(cwd, filePath)), { recursive: true });
    writeFileSync(path.join(cwd, filePath), content);
  }

  return cwd;
}

describe('assertProjectIsMigrated', () => {
  it('rejects PascalCase 1.x component directories', async () => {
    const cwd = createProject({
      'src/components/ui/Button/Button.vue': '<template><button /></template>\n',
      'src/assets/index.css': '@import "tailwindcss";\n',
    });

    await expect(assertProjectIsMigrated(createConfig(cwd))).rejects.toThrow(/1\.x component directories \(Button\)/);
  });

  it('rejects a 1.x stylesheet', async () => {
    const cwd = createProject({
      'src/components/ui/button/Button.vue': '<template><button /></template>\n',
      'src/assets/index.css': ':root { --primary: 240 5.9% 10%; }\n',
    });

    await expect(assertProjectIsMigrated(createConfig(cwd))).rejects.toThrow(/1\.x theme format/);
  });

  it('allows a kebab-case project with a 2.0 stylesheet', async () => {
    const cwd = createProject({
      'src/components/ui/button/Button.vue': '<template><button /></template>\n',
      'src/assets/index.css': '@import "tailwindcss";\n@theme inline { --color-primary: var(--primary); }\n:root { --primary: hsl(240 5.9% 10%); --sidebar: var(--primary); }\n',
    });

    await expect(assertProjectIsMigrated(createConfig(cwd))).resolves.toBeUndefined();
  });
});
