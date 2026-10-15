import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'pathe';

const DEFAULT_CATALOG = 'default';

function unquote(value: string) {
  return value.trim().replace(/^['"]|['"]$/g, '');
}

export function parsePnpmCatalogs(workspaceYaml: string): Record<string, Record<string, string>> {
  const catalogs: Record<string, Record<string, string>> = {};
  let currentCatalog: string | null = null;
  let inNamedCatalogs = false;

  for (const line of workspaceYaml.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) {
      continue;
    }

    const indentation = line.length - line.trimStart().length;
    const [rawKey, ...rawValue] = line.trim().split(':');
    const key = unquote(rawKey);
    const value = unquote(rawValue.join(':'));

    if (indentation === 0) {
      inNamedCatalogs = key === 'catalogs';
      currentCatalog = key === 'catalog' ? DEFAULT_CATALOG : null;
      continue;
    }

    if (inNamedCatalogs && indentation === 2 && !value) {
      currentCatalog = key;
      continue;
    }

    if (currentCatalog && value) {
      catalogs[currentCatalog] ??= {};
      catalogs[currentCatalog][key] = value;
    }
  }

  return catalogs;
}

function findWorkspaceYaml(startDirectory: string) {
  let directory = startDirectory;

  while (true) {
    const candidate = join(directory, 'pnpm-workspace.yaml');

    if (existsSync(candidate)) {
      return candidate;
    }

    const parent = dirname(directory);

    if (parent === directory) {
      return null;
    }

    directory = parent;
  }
}

export function readPackageVersions(packageJsonPath: string): Record<string, string> {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  const declared: Record<string, string> = {
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies,
    ...packageJson.dependencies,
  };

  const workspaceYamlPath = findWorkspaceYaml(dirname(packageJsonPath));
  const catalogs = workspaceYamlPath ? parsePnpmCatalogs(readFileSync(workspaceYamlPath, 'utf8')) : {};

  return Object.fromEntries(
    Object.entries(declared).map(([packageName, version]) => {
      if (!version.startsWith('catalog:')) {
        return [packageName, version];
      }

      const catalogName = version.slice('catalog:'.length) || DEFAULT_CATALOG;
      return [packageName, catalogs[catalogName]?.[packageName] ?? version];
    }),
  );
}
