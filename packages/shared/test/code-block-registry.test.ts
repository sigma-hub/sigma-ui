import { readFileSync } from 'node:fs';
import { resolve } from 'pathe';
import { describe, expect, it } from 'vitest';

const publicRegistry = resolve(__dirname, '../../../apps/docs/src/public/r');

describe.each(['css', 'tailwind'])('%s code-block registry item', (style) => {
  const item = JSON.parse(readFileSync(resolve(publicRegistry, style, 'code-block.json'), 'utf8')) as {
    dependencies: string[];
    registryDependencies: string[];
    files: { path: string; content: string }[];
  };

  it('installs shiki and the button', () => {
    expect(item.dependencies.some(dependency => dependency.startsWith('shiki@'))).toBe(true);
    expect(item.registryDependencies).toEqual(['button']);
  });

  it('ships the shared highlighter files with public imports', () => {
    const paths = item.files.map(file => file.path);

    expect(paths).toEqual(expect.arrayContaining([
      'ui/code-block/highlighter.ts',
      'ui/code-block/lines.ts',
      'ui/code-block/use-highlighted-code.ts',
      'ui/code-block/code-block-state.ts',
    ]));
    expect(item.files.filter(file => file.content.includes('@ui/registry')).map(file => file.path)).toEqual([]);
  });
});
