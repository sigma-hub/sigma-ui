import { readFile, readdir } from 'node:fs/promises';
import { join, normalize, relative, resolve } from 'pathe';
import { getImportSources } from './imports';
import { classifyImportSources } from './dependencies';
import { readPackageVersions } from './package-versions';
import type { Registry } from './schema';

type ArrayItem<T> = T extends Array<infer X> ? X : never;
type RegistryItem = ArrayItem<Registry>;

export async function buildRegistry(registryRoot: string) {
  const packageVersions = readPackageVersions(resolve(registryRoot, '../../package.json'));

  const uiPath = resolve(registryRoot, 'tailwind/ui');
  const uiRegistry = await crawlUI(uiPath, packageVersions);

  const examplePath = resolve(registryRoot, 'tailwind/example');
  const exampleRegistry = await crawlDirectory(examplePath, 'example', packageVersions);

  const blockPath = resolve(registryRoot, 'tailwind/blocks');
  const blockRegistry = await crawlBlocks(blockPath, packageVersions);

  return uiRegistry.concat(exampleRegistry).concat(blockRegistry);
}

async function crawlUI(rootPath: string, packageVersions: Record<string, string>) {
  const dir = await readdir(rootPath, {
    recursive: true,
    withFileTypes: true,
  });

  const uiRegistry: Registry = [];

  for (const dirent of dir) {
    if (!dirent.isDirectory()) {
      continue;
    }

    const componentPath = resolve(rootPath, dirent.name);

    const ui = await buildUIRegistry(componentPath, dirent.name, packageVersions);
    uiRegistry.push(ui);
  }

  return uiRegistry;
}

async function crawlDirectory(rootPath: string, typeName: 'example', packageVersions: Record<string, string>) {
  const type = `components:${typeName}` as const;

  const dir = await readdir(rootPath, {
    recursive: true,
    withFileTypes: true,
  });

  const registry: Registry = [];

  for (const dirent of dir) {
    if (dirent.name === 'index.ts' || !dirent.isFile()) {
      continue;
    }

    const [name] = dirent.name.split('.vue');
    const filePath = join(typeName, normalize(dirent.path).split(`/${typeName}`)[1], dirent.name);
    const { dependencies, registryDependencies } = await getDependencies([join(dirent.path, dirent.name)], name, packageVersions);

    registry.push({
      name,
      type,
      files: [filePath],
      registryDependencies,
      dependencies,
    });
  }

  return registry;
}

async function crawlBlocks(rootPath: string, packageVersions: Record<string, string>) {
  const blockDirectories = (await readdir(rootPath, { withFileTypes: true })).filter(dirent => dirent.isDirectory());
  const registry: Registry = [];

  for (const blockDirectory of blockDirectories) {
    const blockPath = join(rootPath, blockDirectory.name);
    const fileNames = (await readdir(blockPath, { recursive: true, withFileTypes: true }))
      .filter(dirent => dirent.isFile())
      .map(dirent => relative(blockPath, join(dirent.parentPath, dirent.name)))
      .sort();
    const { dependencies, registryDependencies } = await getDependencies(
      fileNames.map(fileName => join(blockPath, fileName)),
      blockDirectory.name,
      packageVersions,
    );

    registry.push({
      name: blockDirectory.name,
      type: 'components:block',
      files: fileNames.map(fileName => join('blocks', blockDirectory.name, fileName)),
      registryDependencies,
      dependencies,
    });
  }

  return registry;
}

async function buildUIRegistry(componentPath: string, componentName: string, packageVersions: Record<string, string>) {
  const dir = await readdir(componentPath, {
    withFileTypes: true,
  });

  const fileNames = dir.filter(dirent => dirent.isFile()).map(dirent => dirent.name).sort();
  const { dependencies, registryDependencies } = await getDependencies(
    fileNames.map(fileName => join(componentPath, fileName)),
    componentName,
    packageVersions,
  );

  return {
    name: componentName,
    type: 'components:ui',
    files: fileNames.map(fileName => join(componentName, fileName)),
    registryDependencies,
    dependencies,
  } satisfies RegistryItem;
}

async function getDependencies(filenames: string[], itemName: string, packageVersions: Record<string, string>) {
  const sources = await Promise.all(
    filenames.map(async filename => getImportSources(await readFile(filename, 'utf8'), filename)),
  );

  return classifyImportSources(sources.flat(), { itemName, packageVersions });
}
