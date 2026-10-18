import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'pathe';
import type { Config, RegistryItem, RegistryItemFile } from '@/src/schemas';
import type { ResolvedRegistryItem } from '@/src/utils/registry';
import { transformFileContent } from '@/src/utils/transformers';
import { transformFileName } from '@/src/utils/transformers/transform-component-naming';

export type PlannedFileStatus = 'create' | 'update' | 'unchanged';

export interface PlannedFile {
  itemName: string;
  requested: boolean;
  targetPath: string;
  content: string;
  currentContent: string | null;
  status: PlannedFileStatus;
}

export interface InstallPlan {
  items: ResolvedRegistryItem[];
  files: PlannedFile[];
  dependencies: string[];
  devDependencies: string[];
}

function getPathWithinItem(filePath: string, itemName: string) {
  const segments = filePath.split('/');
  const itemSegmentIndex = segments.lastIndexOf(itemName);

  if (itemSegmentIndex !== -1 && itemSegmentIndex < segments.length - 1) {
    return segments.slice(itemSegmentIndex + 1).join('/');
  }

  return path.basename(filePath);
}

function withNaming(relativePath: string, config: Pick<Config, 'componentNaming'>) {
  const directory = path.dirname(relativePath);
  const fileName = transformFileName(path.basename(relativePath), config.componentNaming);
  return directory === '.' ? fileName : path.join(directory, fileName);
}

function getFileBaseDirectory(file: RegistryItemFile, item: RegistryItem, config: Config) {
  const { resolvedPaths } = config;

  switch (file.type) {
    case 'registry:ui':
      return path.join(resolvedPaths.components, item.name);
    case 'registry:lib':
      return resolvedPaths.lib;
    case 'registry:composable':
    case 'registry:hook':
      return resolvedPaths.composables;
    case 'registry:block':
    case 'registry:component':
    case 'registry:example':
    case 'registry:page':
      return path.dirname(resolvedPaths.components);
    case 'registry:file':
    case 'registry:theme':
    case 'registry:style':
    case 'registry:item':
    case 'registry:internal':
      return resolvedPaths.cwd;

    default: {
      const unsupportedType: never = file.type;
      throw new Error(`Unsupported file type "${unsupportedType}" in "${item.name}".`);
    }
  }
}

export function assertPathInsideProject(cwd: string, targetPath: string, originalTarget: string) {
  const relativePath = path.relative(cwd, targetPath);

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    throw new Error(`Registry file target "${originalTarget}" resolves outside the project.`);
  }
}

export function resolveRegistryFileTarget(cwd: string, target: string) {
  if (path.isAbsolute(target)) {
    throw new Error(`Registry file target "${target}" must be a path inside the project.`);
  }

  const withoutHomeAlias = target.replace(/^~\//, '');
  const segments = withoutHomeAlias.split(/[\\/]/).filter(Boolean);

  if (segments.includes('..')) {
    throw new Error(`Registry file target "${target}" must not contain "..".`);
  }

  const resolved = path.resolve(cwd, withoutHomeAlias);
  assertPathInsideProject(cwd, resolved, target);
  return resolved;
}

export function getFileTargetPath(file: RegistryItemFile, item: RegistryItem, config: Config, pathOverride?: string) {
  if (file.target) {
    return resolveRegistryFileTarget(config.resolvedPaths.cwd, file.target);
  }

  const relativePath = withNaming(getPathWithinItem(file.path, item.name), config);
  const groupsFilesInItemDirectory = item.type === 'registry:ui' || item.type === 'registry:block' || item.type === 'registry:example';

  if (pathOverride) {
    return path.resolve(pathOverride, groupsFilesInItemDirectory ? path.join(item.name, relativePath) : relativePath);
  }

  if (item.type === 'registry:block') {
    return path.join(config.resolvedPaths.blocks, item.name, relativePath);
  }

  // An example and the sibling files it imports share one folder, so `./CustomChartTooltip.vue` keeps resolving.
  if (item.type === 'registry:example') {
    return path.join(path.dirname(config.resolvedPaths.components), 'examples', item.name, path.basename(relativePath));
  }

  const baseDirectory = getFileBaseDirectory(file, item, config);
  return path.join(baseDirectory, file.type === 'registry:ui' ? relativePath : path.basename(relativePath));
}

function getPackageName(dependency: string) {
  const versionSeparatorIndex = dependency.indexOf('@', dependency.startsWith('@') ? 1 : 0);
  return versionSeparatorIndex === -1 ? dependency : dependency.slice(0, versionSeparatorIndex);
}

function uniqueDependencies(dependencies: string[]) {
  const byPackageName = new Map<string, string>();

  for (const dependency of dependencies) {
    const packageName = getPackageName(dependency);

    if (!byPackageName.has(packageName) || dependency.length > byPackageName.get(packageName)!.length) {
      byPackageName.set(packageName, dependency);
    }
  }

  return [...byPackageName.values()].sort();
}

export function excludeInstalledDependencies(dependencies: string[], installedPackages: Set<string>) {
  return dependencies.filter(dependency => !installedPackages.has(getPackageName(dependency)));
}

export interface IncompatibleDependency {
  /** The registry dependency, such as `zod@^4.6.7`. */
  dependency: string;
  name: string;
  required: string;
  installed: string;
}

/**
 * The part of a version or range that has to match for semver compatibility: the major version, or `0.minor`
 * below 1.0.0. Returns undefined for ranges this check does not understand (`*`, `latest`, `workspace:`, `a || b`).
 */
export function getCompatibilityKey(version: string) {
  const match = version.trim().match(/^(?:\^|~|>=|=|v)?\s*(\d+)(?:\.(\d+))?(?:\.[\dx*]+)?(?:[-+][\w.-]*)?$/);

  if (!match) {
    return undefined;
  }

  return match[1] === '0' && match[2] !== undefined ? `0.${match[2]}` : match[1];
}

/** Dependencies already installed at a major version the registry item does not support. */
export function findIncompatibleDependencies(dependencies: string[], installedVersions: Map<string, string>) {
  const incompatible: IncompatibleDependency[] = [];

  for (const dependency of dependencies) {
    const name = getPackageName(dependency);
    const required = dependency.slice(name.length + 1);
    const installed = installedVersions.get(name);

    if (!required || !installed) {
      continue;
    }

    const requiredKey = getCompatibilityKey(required);
    const installedKey = getCompatibilityKey(installed);

    if (requiredKey && installedKey && requiredKey !== installedKey) {
      incompatible.push({ dependency, name, required, installed });
    }
  }

  return incompatible;
}

export async function createInstallPlan(
  items: ResolvedRegistryItem[],
  config: Config,
  options: { pathOverride?: string } = {},
): Promise<InstallPlan> {
  const files: PlannedFile[] = [];

  for (const { item, requested } of items) {
    for (const file of item.files ?? []) {
      if (file.content === undefined) {
        throw new Error(`"${item.name}" has no content for ${file.path}. Registry items must include file contents.`);
      }

      const targetPath = getFileTargetPath(file, item, config, options.pathOverride);
      const content = transformFileContent(file.content, config);
      const currentContent = existsSync(targetPath) ? await readFile(targetPath, 'utf8') : null;
      let status: PlannedFileStatus = 'create';

      if (currentContent !== null) {
        status = currentContent === content ? 'unchanged' : 'update';
      }

      files.push({ itemName: item.name, requested, targetPath, content, currentContent, status });
    }
  }

  return {
    items,
    files,
    dependencies: uniqueDependencies(items.flatMap(({ item }) => item.dependencies ?? [])),
    devDependencies: uniqueDependencies(items.flatMap(({ item }) => item.devDependencies ?? [])),
  };
}
