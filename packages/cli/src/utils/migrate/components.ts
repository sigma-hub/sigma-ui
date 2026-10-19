import { existsSync } from 'node:fs';
import { readdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'pathe';
import { pascalToKebab } from '@/src/utils/transformers/transform-component-naming';

export interface DirectoryRename {
  from: string;
  to: string;
}

const SOURCE_EXTENSIONS = new Set(['.vue', '.ts', '.tsx', '.js', '.jsx', '.mts', '.mjs', '.cts', '.cjs', '.astro']);
const IGNORED_DIRECTORIES = new Set(['node_modules', '.git', '.nuxt', '.output', '.vitepress', 'dist', 'build', 'coverage']);

export async function planComponentDirectoryRenames(componentsDirectory: string): Promise<{ renames: DirectoryRename[]; conflicts: string[] }> {
  if (!existsSync(componentsDirectory)) {
    return { renames: [], conflicts: [] };
  }

  const entries = await readdir(componentsDirectory, { withFileTypes: true });
  const directoryNames = new Set(entries.filter(entry => entry.isDirectory()).map(entry => entry.name));
  const renames: DirectoryRename[] = [];
  const conflicts: string[] = [];

  for (const name of directoryNames) {
    const kebabName = pascalToKebab(name);

    if (kebabName === name) {
      continue;
    }

    if (directoryNames.has(kebabName)) {
      conflicts.push(`${name} and ${kebabName} both exist`);
      continue;
    }

    renames.push({ from: name, to: kebabName });
  }

  return { renames: renames.sort((first, second) => first.from.localeCompare(second.from)), conflicts };
}

export async function renameComponentDirectories(componentsDirectory: string, renames: DirectoryRename[]) {
  for (const { from, to } of renames) {
    const temporaryName = `${to}.sigma-ui-migrate`;

    await rename(path.join(componentsDirectory, from), path.join(componentsDirectory, temporaryName));
    await rename(path.join(componentsDirectory, temporaryName), path.join(componentsDirectory, to));
  }
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function rewriteComponentImports(content: string, componentsAlias: string, renames: DirectoryRename[]) {
  if (!renames.length) {
    return content;
  }

  const renameMap = new Map(renames.map(({ from, to }) => [from, to]));
  const directoryPattern = renames.map(({ from }) => escapeRegExp(from)).join('|');
  const importPattern = new RegExp(`(['"])${escapeRegExp(componentsAlias.replace(/\/$/, ''))}/(${directoryPattern})(?=['"/])`, 'g');

  return content.replace(importPattern, (_match, quote: string, directory: string) => {
    return `${quote}${componentsAlias.replace(/\/$/, '')}/${renameMap.get(directory)}`;
  });
}

const RELATIVE_IMPORT_PATTERN = /(from\s+|import\s*\(\s*|require\s*\(\s*|import\s+)(['"])(\.\.?\/[^'"]+)\2/g;

export function rewriteRelativeImports(content: string, filePath: string, componentsDirectory: string, renames: DirectoryRename[]) {
  if (!renames.length) {
    return content;
  }

  const renameMap = new Map(renames.map(({ from, to }) => [from, to]));

  return content.replace(RELATIVE_IMPORT_PATTERN, (match, prefix: string, quote: string, specifier: string) => {
    const rewritten = rewriteRelativeSpecifier(filePath, componentsDirectory, specifier, renameMap);

    if (rewritten === specifier) {
      return match;
    }

    return `${prefix}${quote}${rewritten}${quote}`;
  });
}

function splitSpecifierSuffix(specifier: string) {
  const suffixIndex = specifier.search(/[?#]/);

  if (suffixIndex === -1) {
    return { pathname: specifier, suffix: '' };
  }

  return { pathname: specifier.slice(0, suffixIndex), suffix: specifier.slice(suffixIndex) };
}

function relocateRenamedDirectory(absolutePath: string, componentsDirectory: string, renameMap: Map<string, string>) {
  const relativePath = path.relative(componentsDirectory, absolutePath);

  if (!relativePath || relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    return absolutePath;
  }

  const [directoryName, ...remainder] = relativePath.split('/');
  const renamed = directoryName ? renameMap.get(directoryName) : undefined;

  if (!renamed) {
    return absolutePath;
  }

  return path.join(componentsDirectory, renamed, ...remainder);
}

function rewriteRelativeSpecifier(filePath: string, componentsDirectory: string, specifier: string, renameMap: Map<string, string>) {
  const { pathname, suffix } = splitSpecifierSuffix(specifier);
  const resolved = path.resolve(path.dirname(filePath), pathname);
  const relocatedTarget = relocateRenamedDirectory(resolved, componentsDirectory, renameMap);

  if (relocatedTarget === resolved) {
    return specifier;
  }

  const relocatedFileDirectory = relocateRenamedDirectory(path.dirname(filePath), componentsDirectory, renameMap);
  let rewritten = path.relative(relocatedFileDirectory, relocatedTarget);

  if (!rewritten.startsWith('.')) {
    rewritten = `./${rewritten}`;
  }

  return `${rewritten}${suffix}`;
}

export async function findSourceFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (!IGNORED_DIRECTORIES.has(entry.name)) {
        files.push(...await findSourceFiles(entryPath));
      }

      continue;
    }

    if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(entryPath);
    }
  }

  return files;
}

export async function planImportRewrites(cwd: string, componentsDirectory: string, componentsAlias: string, renames: DirectoryRename[]) {
  if (!renames.length) {
    return [];
  }

  const rewrites: { file: string; content: string }[] = [];

  for (const file of await findSourceFiles(cwd)) {
    const content = await readFile(file, 'utf8');
    const rewritten = rewriteRelativeImports(
      rewriteComponentImports(content, componentsAlias, renames),
      file,
      componentsDirectory,
      renames,
    );

    if (rewritten !== content) {
      rewrites.push({ file, content: rewritten });
    }
  }

  return rewrites;
}

export async function applyImportRewrites(rewrites: { file: string; content: string }[]) {
  for (const { file, content } of rewrites) {
    await writeFile(file, content, 'utf8');
  }
}
