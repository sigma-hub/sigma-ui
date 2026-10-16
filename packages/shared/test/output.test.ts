import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'pathe';
import { beforeEach, describe, expect, it } from 'vitest';
import { writeRegistry } from '../src/registry';
import type { Registry } from '../src/schemas';

describe('writeRegistry', () => {
  let sourceRoot: string;
  let outputDirectory: string;

  beforeEach(() => {
    sourceRoot = mkdtempSync(join(tmpdir(), 'sigma-ui-source-'));
    outputDirectory = join(sourceRoot, 'public/r');
    mkdirSync(join(sourceRoot, 'hello'));
    writeFileSync(join(sourceRoot, 'hello/Hello.vue'), '<template>\r\n  <p>Hello</p>\r\n</template>\r\n');
  });

  const registry = (items: Registry['items']): Registry => ({ name: 'acme', items });

  it('writes items with contents and an index without contents', async () => {
    const writtenFiles = await writeRegistry({
      registry: registry([{ name: 'hello', type: 'registry:block', files: [{ path: 'hello/Hello.vue', type: 'registry:component' }] }]),
      sourceRoot,
      outputDirectory,
      transformContent: content => content.replace('Hello', 'Hi'),
    });

    expect(writtenFiles).toEqual([join(outputDirectory, 'hello.json'), join(outputDirectory, 'registry.json')]);

    const item = JSON.parse(readFileSync(join(outputDirectory, 'hello.json'), 'utf8'));
    expect(item.$schema).toBe('https://ui.shadcn.com/schema/registry-item.json');
    expect(item.files[0].content).toBe('<template>\n  <p>Hi</p>\n</template>\n');

    const index = JSON.parse(readFileSync(join(outputDirectory, 'registry.json'), 'utf8'));
    expect(index.$schema).toBe('https://ui.shadcn.com/schema/registry.json');
    expect(index.items[0].files[0]).toEqual({ path: 'hello/Hello.vue', type: 'registry:component' });
  });

  it('rejects unsafe or duplicate item names', async () => {
    const file = [{ path: 'hello/Hello.vue', type: 'registry:component' as const }];

    await expect(writeRegistry({ registry: registry([{ name: '../hello', type: 'registry:block', files: file }]), sourceRoot, outputDirectory }))
      .rejects.toThrow(/not a valid registry item name/);
    await expect(writeRegistry({ registry: registry([{ name: 'registry', type: 'registry:block', files: file }]), sourceRoot, outputDirectory }))
      .rejects.toThrow(/not a valid registry item name/);
    await expect(writeRegistry({
      registry: registry([{ name: 'hello', type: 'registry:block', files: file }, { name: 'hello', type: 'registry:block', files: file }]),
      sourceRoot,
      outputDirectory,
    })).rejects.toThrow(/more than once/);
  });

  it('reads a sibling shared file when the style tree does not have a copy', async () => {
    const registryRoot = mkdtempSync(join(tmpdir(), 'sigma-ui-shared-source-'));
    const styleRoot = join(registryRoot, 'css');
    const outputDirectory = join(registryRoot, 'out');

    mkdirSync(join(registryRoot, 'shared', 'ui', 'chart'), { recursive: true });
    writeFileSync(join(registryRoot, 'shared', 'ui', 'chart', 'helper.ts'), 'export const helper = 1;\n');

    await writeRegistry({
      registry: registry([{
        name: 'chart',
        type: 'registry:ui',
        files: [{ path: 'ui/chart/helper.ts', type: 'registry:ui' }],
      }]),
      sourceRoot: styleRoot,
      outputDirectory,
    });

    const item = JSON.parse(readFileSync(join(outputDirectory, 'chart.json'), 'utf8'));
    expect(item.files[0].content).toBe('export const helper = 1;\n');
  });

  it('rejects files outside the source root', async () => {
    await expect(writeRegistry({
      registry: registry([{ name: 'hello', type: 'registry:block', files: [{ path: '../secret.txt', type: 'registry:file' }] }]),
      sourceRoot,
      outputDirectory,
    })).rejects.toThrow(/outside/);
  });
});
