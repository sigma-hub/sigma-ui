import blocks from '@ui/registry/blocks.json';

export type BlockMeta = typeof blocks[number];

export interface BlockFileNode {
  name: string;
  path: string | null;
  depth: number;
}

export function getBlockComponentName(blockName: string) {
  return blockName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

export function getBlockMeta(blockName: string): BlockMeta | undefined {
  return blocks.find(block => block.name === blockName);
}

export function getBlocksByCategory(category: string): BlockMeta[] {
  return blocks.filter(block => block.categories.includes(category));
}

export function getBlockMainFile(blockName: string) {
  return `${getBlockComponentName(blockName)}.vue`;
}

function buildFileTree(paths: string[], depth: number, parentPath: string, mainFile: string): BlockFileNode[] {
  const files = paths.filter(filePath => !filePath.includes('/'));
  const folders = new Map<string, string[]>();

  for (const filePath of paths.filter(nestedPath => nestedPath.includes('/'))) {
    const [folder, ...rest] = filePath.split('/');
    folders.set(folder, [...(folders.get(folder) ?? []), rest.join('/')]);
  }

  const folderNodes = [...folders.keys()].sort().flatMap(folder => [
    { name: folder, path: null, depth },
    ...buildFileTree(folders.get(folder)!, depth + 1, `${parentPath}${folder}/`, mainFile),
  ]);

  const fileNodes = files
    .sort((first, second) => Number(second === mainFile) - Number(first === mainFile) || first.localeCompare(second))
    .map(fileName => ({ name: fileName, path: `${parentPath}${fileName}`, depth }));

  return [...folderNodes, ...fileNodes];
}

export function getBlockFileTree(blockName: string, files: string[]): BlockFileNode[] {
  const blockPrefix = `blocks/${blockName}/`;
  const relativePaths = files.map(file => (file.startsWith(blockPrefix) ? file.slice(blockPrefix.length) : file));

  return buildFileTree(relativePaths, 0, '', getBlockMainFile(blockName));
}
