import { builtinModules } from 'node:module';

const REGISTRY_UI_IMPORT_PATTERN = /^@ui\/registry\/[^/]+\/ui\/([^/]+)/;
const LOCAL_IMPORT_PREFIXES = ['.', '/', '@/', '@ui/', '~/', '~~/', '#', 'node:', 'virtual:'];
const IGNORED_PACKAGES = new Set(['vue']);
const COMPANION_PACKAGES: Record<string, string[]> = {
  '@unovis/vue': ['@unovis/ts'],
};

export interface ImportClassification {
  registryDependencies: string[];
  dependencies: string[];
}

export interface ClassifyImportsOptions {
  itemName?: string;
  packageVersions?: Record<string, string>;
}

export function getRegistryDependencyName(source: string): string | null {
  return source.match(REGISTRY_UI_IMPORT_PATTERN)?.[1] ?? null;
}

export function getPackageName(source: string): string | null {
  if (LOCAL_IMPORT_PREFIXES.some(prefix => source.startsWith(prefix))) {
    return null;
  }

  const segments = source.split('/');
  const packageName = source.startsWith('@') ? segments.slice(0, 2).join('/') : segments[0];

  if (!packageName || builtinModules.includes(packageName) || IGNORED_PACKAGES.has(packageName)) {
    return null;
  }

  return packageName;
}

export function withPackageVersion(packageName: string, packageVersions: Record<string, string> = {}) {
  const version = packageVersions[packageName];

  if (!version || version.startsWith('workspace:') || version.startsWith('catalog:')) {
    return packageName;
  }

  return `${packageName}@${version}`;
}

export function classifyImportSources(sources: string[], options: ClassifyImportsOptions = {}): ImportClassification {
  const registryDependencies = new Set<string>();
  const packageNames = new Set<string>();

  for (const source of sources) {
    const registryDependency = getRegistryDependencyName(source);

    if (registryDependency) {
      if (registryDependency !== options.itemName) {
        registryDependencies.add(registryDependency);
      }

      continue;
    }

    const packageName = getPackageName(source);

    if (packageName) {
      packageNames.add(packageName);
      COMPANION_PACKAGES[packageName]?.forEach(companion => packageNames.add(companion));
    }
  }

  return {
    registryDependencies: [...registryDependencies].sort(),
    dependencies: [...packageNames].sort().map(packageName => withPackageVersion(packageName, options.packageVersions)),
  };
}
