import blocks from '@ui/registry/blocks.json';

export type BlockMeta = typeof blocks[number];

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
