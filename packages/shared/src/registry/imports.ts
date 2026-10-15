import { parse } from '@vue/compiler-sfc';
import { parseSync } from '@oxc-parser/wasm';

interface ModuleSourceNode {
  type: string;
  source?: { value: string } | null;
}

export function getScriptImportSources(code: string, sourceFilename: string): string[] {
  const ast = parseSync(code, {
    sourceType: 'module',
    sourceFilename,
  });

  return (ast.program.body as ModuleSourceNode[])
    .filter(node => ['ImportDeclaration', 'ExportNamedDeclaration', 'ExportAllDeclaration'].includes(node.type))
    .map(node => node.source?.value)
    .filter((source): source is string => Boolean(source));
}

export function getImportSources(code: string, filename: string): string[] {
  if (!filename.endsWith('.vue')) {
    return getScriptImportSources(code, filename);
  }

  const { descriptor } = parse(code, { filename });
  const scriptBlocks = [descriptor.script, descriptor.scriptSetup].filter(block => block !== null);

  return scriptBlocks.flatMap(block => getScriptImportSources(block.content, `${filename}.${block.lang ?? 'js'}`));
}
