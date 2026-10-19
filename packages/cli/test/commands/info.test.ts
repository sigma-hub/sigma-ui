import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'pathe';
import { describe, expect, it } from 'vitest';
import { describeProject, formatProjectReport } from '../../src/commands/info';

describe('info', () => {
  it('describes the project configuration and configured registries', async () => {
    const cwd = mkdtempSync(path.join(tmpdir(), 'sigma-ui-info-'));
    writeFileSync(path.join(cwd, 'package.json'), JSON.stringify({ devDependencies: { nuxt: '^4.0.0', tailwindcss: '^4.0.0' } }));
    writeFileSync(path.join(cwd, 'nuxt.config.ts'), 'export default {}\n');
    writeFileSync(path.join(cwd, 'sigma-ui.config.json'), JSON.stringify({
      styleSystem: 'tailwind',
      framework: 'nuxt',
      cssPath: 'app/assets/css/tailwind.css',
      baseColor: 'zinc',
      componentNaming: 'kebab-case',
      tailwind: { prefix: 'tw-' },
      aliases: { components: '@/components/ui', utils: '@/lib/utils' },
      registries: { '@acme': 'https://acme.dev/r/{style}/{name}.json' },
    }));

    const report = await describeProject(cwd);

    expect(report).toMatchObject({
      styleSystem: 'tailwind',
      framework: 'nuxt',
      baseColor: 'zinc',
      componentNaming: 'kebab-case',
      cssPath: 'app/assets/css/tailwind.css',
      tailwind: { prefix: 'tw-', installed: true, detectedConfig: 'css' },
      registries: { '@acme': 'https://acme.dev/r/{style}/{name}.json' },
    });
    expect(report?.resolvedPaths.components).toBe(path.join(cwd, 'components/ui'));
    expect(formatProjectReport(report!)).toContain('@acme  https://acme.dev/r/{style}/{name}.json');
    expect(formatProjectReport(report!)).toMatch(/Tailwind prefix\s+tw-/);
  });

  it('returns null when the project has no config', async () => {
    const cwd = mkdtempSync(path.join(tmpdir(), 'sigma-ui-info-'));
    expect(await describeProject(cwd)).toBeNull();
  });
});
