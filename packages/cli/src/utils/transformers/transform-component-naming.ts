import type { ComponentNaming } from '@/src/schemas';

export function pascalToKebab(pascalCase: string): string {
  return pascalCase
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

export function kebabToPascal(kebabCase: string): string {
  return kebabCase
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

export function transformFileName(fileName: string, naming: ComponentNaming): string {
  if (naming === 'pascal-case') {
    return fileName;
  }

  if (fileName === 'index.ts') {
    return fileName;
  }

  const extension = fileName.includes('.') ? fileName.slice(fileName.lastIndexOf('.')) : '';
  const baseName = fileName.includes('.') ? fileName.slice(0, fileName.lastIndexOf('.')) : fileName;

  return pascalToKebab(baseName) + extension;
}

export function transformLocalVueImports(content: string, naming: ComponentNaming): string {
  if (naming === 'pascal-case') {
    return content;
  }

  return content.replace(
    /from\s+(['"])(\.{1,2}\/(?:[\w.-]+\/)*)([\w-]+)\.vue\1/g,
    (match, quote, directory, componentName) => `from ${quote}${directory}${pascalToKebab(componentName)}.vue${quote}`,
  );
}
