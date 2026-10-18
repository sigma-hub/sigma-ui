import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'pathe';
import { parse } from '@vue/compiler-sfc';
import { describe, expect, it } from 'vitest';

const registryRoot = resolve(__dirname, '../../lib/src/registry');

interface TemplateNode {
  type: number;
  tag?: string;
  isSelfClosing?: boolean;
  loc: { source: string; start: { line: number } };
  children?: TemplateNode[];
  branches?: TemplateNode[];
}

const ELEMENT = 1;

function listVueFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      return listVueFiles(entryPath);
    }

    return entry.name.endsWith('.vue') ? [entryPath] : [];
  });
}

function findCaseMismatches(node: TemplateNode, file: string, found: string[]) {
  if (node.type === ELEMENT && node.tag && !node.isSelfClosing) {
    const closing = node.loc.source.match(/<\/([\w.-]+)\s*>$/)?.[1];

    if (closing && closing !== node.tag) {
      found.push(`${file}:${node.loc.start.line} <${node.tag}> closed by </${closing}>`);
    }
  }

  for (const child of [...(node.children ?? []), ...(node.branches ?? [])]) {
    findCaseMismatches(child, file, found);
  }
}

describe('registry templates', () => {
  // Vue matches closing tags without regard to case, so `<form>...</Form>` compiles,
  // but it reads as a component and breaks HTML tooling. Keep every pair spelled the same.
  it('closes every element with the same tag case it opened with', () => {
    const found: string[] = [];

    for (const filePath of listVueFiles(registryRoot)) {
      const { descriptor } = parse(readFileSync(filePath, 'utf8'), { filename: filePath });
      const ast = descriptor.template?.ast as TemplateNode | undefined;

      if (ast) {
        findCaseMismatches(ast, relative(registryRoot, filePath), found);
      }
    }

    expect(found).toEqual([]);
  });
});
