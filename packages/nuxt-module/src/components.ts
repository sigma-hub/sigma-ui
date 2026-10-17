import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';
import { findPath } from '@nuxt/kit';
import { parseSync } from 'oxc-parser';

export interface ComponentExport {
  exportName: string;
  filePath: string;
}

const INDEX_EXTENSIONS = ['.ts', '.js'];
const COMPONENT_EXPORT_PATTERN = /^[A-Z]/;
const ALL_CAPS_EXPORT_PATTERN = /^[A-Z0-9_]+$/;

function isPathInside(child: string, parent: string): boolean {
  const relativePath = relative(parent, child);

  return relativePath !== '' && !relativePath.startsWith('..') && !isAbsolute(relativePath);
}

export function ignorePatternsForComponentDir(componentsPath: string, scannedDirPath: string): string[] {
  const componentsRoot = resolve(componentsPath);
  const scannedRoot = resolve(scannedDirPath);

  if (componentsRoot === scannedRoot || isPathInside(scannedRoot, componentsRoot)) {
    return ['**/*'];
  }

  if (!isPathInside(componentsRoot, scannedRoot)) {
    return [];
  }

  const relativePath = relative(scannedRoot, componentsRoot).split(sep).join('/');

  return [`${relativePath}/**`];
}

export function isComponentIndexFile(componentsPath: string, filePath: string): boolean {
  const segments = relative(componentsPath, filePath).split(sep);

  if (segments.length !== 2 || segments[0] === '..') {
    return false;
  }

  return INDEX_EXTENSIONS.some(extension => segments[1] === `index${extension}`);
}

export function getComponentExportNames(filePath: string, source: string): string[] {
  const { module, errors } = parseSync(filePath, source, { sourceType: 'module' });

  if (errors.length) {
    throw new Error(errors.map(error => error.message).join('\n'));
  }

  return module.staticExports
    .flatMap(staticExport => staticExport.entries)
    .filter(entry => !entry.isType && entry.exportName.kind === 'Name')
    .map(entry => entry.exportName.name)
    .filter((exportName): exportName is string => {
      return !!exportName && COMPONENT_EXPORT_PATTERN.test(exportName) && !ALL_CAPS_EXPORT_PATTERN.test(exportName);
    });
}

export async function scanComponentExports(
  componentsPath: string,
  onError: (filePath: string, error: unknown) => void,
): Promise<ComponentExport[]> {
  if (!existsSync(componentsPath)) {
    return [];
  }

  const entries = await readdir(componentsPath, { withFileTypes: true });
  const componentDirectories = entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();

  const exportsPerDirectory = await Promise.all(componentDirectories.map(async (directory) => {
    const indexPath = await findPath(join(componentsPath, directory, 'index'), { extensions: INDEX_EXTENSIONS });

    if (!indexPath) {
      return [];
    }

    try {
      const source = await readFile(indexPath, 'utf8');

      return getComponentExportNames(indexPath, source).map(exportName => ({
        exportName,
        filePath: indexPath,
      }));
    } catch (error) {
      onError(indexPath, error);
      return [];
    }
  }));

  return exportsPerDirectory.flat();
}
