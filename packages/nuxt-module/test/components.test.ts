import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { getComponentExportNames, ignorePatternsForComponentDir, isComponentIndexFile, scanComponentExports } from '../src/components';

const fixtureComponentsPath = fileURLToPath(new URL('./fixtures/basic/components/ui', import.meta.url));

describe('getComponentExportNames', () => {
  it('returns PascalCase value exports and skips helpers and type-only exports', () => {
    const source = [
      `import { cva } from 'class-variance-authority';`,
      `export { default as Button } from './Button.vue';`,
      `export { DialogClose, type DialogProps } from 'reka-ui';`,
      `export { Form, Field as FormField } from 'vee-validate';`,
      `export const buttonVariants = cva('');`,
      `export type ButtonVariants = string;`,
      `export interface ButtonProps { size?: string }`,
      `export type { Foo } from './types';`,
      `export * from './other';`,
    ].join('\n');

    expect(getComponentExportNames('index.ts', source)).toEqual(['Button', 'DialogClose', 'Form', 'FormField']);
  });

  it('throws on syntax errors', () => {
    expect(() => getComponentExportNames('index.ts', 'export { Button from')).toThrow();
  });
});

describe('ignorePatternsForComponentDir', () => {
  const componentsPath = join('/project', 'app', 'components', 'ui');

  it('ignores the component directory inside a parent scan', () => {
    expect(ignorePatternsForComponentDir(componentsPath, join('/project', 'app', 'components'))).toEqual(['ui/**']);
  });

  it('ignores a scan of the component directory itself and directories inside it', () => {
    expect(ignorePatternsForComponentDir(componentsPath, componentsPath)).toEqual(['**/*']);
    expect(ignorePatternsForComponentDir(componentsPath, join(componentsPath, 'button'))).toEqual(['**/*']);
  });

  it('leaves unrelated directories alone', () => {
    expect(ignorePatternsForComponentDir(componentsPath, join('/project', 'app', 'components', 'ui-extra'))).toEqual([]);
    expect(ignorePatternsForComponentDir(componentsPath, join('/project', 'other'))).toEqual([]);
  });
});

describe('isComponentIndexFile', () => {
  const componentsPath = join('/project', 'components', 'ui');

  it('matches index files of direct component directories', () => {
    expect(isComponentIndexFile(componentsPath, join(componentsPath, 'button', 'index.ts'))).toBe(true);
    expect(isComponentIndexFile(componentsPath, join(componentsPath, 'button', 'index.js'))).toBe(true);
  });

  it('ignores other files and paths outside the components directory', () => {
    expect(isComponentIndexFile(componentsPath, join(componentsPath, 'button', 'Button.vue'))).toBe(false);
    expect(isComponentIndexFile(componentsPath, join(componentsPath, 'index.ts'))).toBe(false);
    expect(isComponentIndexFile(componentsPath, join(componentsPath, 'button', 'nested', 'index.ts'))).toBe(false);
    expect(isComponentIndexFile(componentsPath, join('/project', 'components', 'other', 'index.ts'))).toBe(false);
  });
});

describe('scanComponentExports', () => {
  it('collects exports from every component index file', async () => {
    const onError = vi.fn();
    const indexPath = join(fixtureComponentsPath, 'fixture-button', 'index.ts');

    await expect(scanComponentExports(fixtureComponentsPath, onError)).resolves.toEqual([
      { exportName: 'FixtureButton', filePath: indexPath },
      { exportName: 'FixtureButtonGroup', filePath: indexPath },
    ]);
    expect(onError).not.toHaveBeenCalled();
  });

  it('returns no components when the directory does not exist', async () => {
    await expect(scanComponentExports(join(fixtureComponentsPath, 'missing'), vi.fn())).resolves.toEqual([]);
  });
});
