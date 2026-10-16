import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'pathe';
import { parse } from '@vue/compiler-sfc';
import { describe, expect, it } from 'vitest';

const CSS_BLOCKS_PATH = resolve(__dirname, '../../lib/src/registry/css/blocks');
const STATIC_CLASS_PATTERN = /\sclass="([^"]*)"/g;
const BOUND_CLASS_PATTERN = /\s:class="([^"]*)"/g;
const QUOTED_PATTERN = /'([^']*)'/g;

function listVueFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      return listVueFiles(entryPath);
    }

    return entry.name.endsWith('.vue') ? [entryPath] : [];
  });
}

function getClassTokens(template: string) {
  const staticClasses = [...template.matchAll(STATIC_CLASS_PATTERN)].map(match => match[1]);
  const boundClasses = [...template.matchAll(BOUND_CLASS_PATTERN)]
    .flatMap(match => [...match[1].matchAll(QUOTED_PATTERN)].map(quoted => quoted[1]));

  return [...staticClasses, ...boundClasses].flatMap(value => value.split(/\s+/)).filter(Boolean);
}

describe('CSS style blocks', () => {
  const blockNames = readdirSync(CSS_BLOCKS_PATH, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);

  it.each(blockNames)('%s only uses classes prefixed with the block name', (blockName) => {
    const unprefixed = listVueFiles(join(CSS_BLOCKS_PATH, blockName)).flatMap((file) => {
      const template = parse(readFileSync(file, 'utf8')).descriptor.template?.content ?? '';

      return getClassTokens(template)
        .filter(token => !token.startsWith(`${blockName}__`) && !token.startsWith(`${blockName}--`) && token !== blockName)
        .map(token => `${relative(CSS_BLOCKS_PATH, file)}: ${token}`);
    });

    expect(unprefixed).toEqual([]);
  });
});
