import { readFile, readdir } from 'node:fs/promises';
import { join, normalize, resolve } from 'pathe';
import { getImportSources } from './imports';
import type { Registry } from './schema';

const DEPENDENCIES = new Map<string, string[]>([
  ['@vueuse/core', []],
  ['vue-sonner', []],
  ['vaul-vue', []],
  ['@tanstack/vue-table', []],
  ['@unovis/vue', ['@unovis/ts']],
  ['embla-carousel-vue', []],
  ['vee-validate', ['@vee-validate/zod', 'zod']],
  ['motion-v', []],
]);
const REGISTRY_DEPENDENCY = '@/';

type ArrayItem<T> = T extends Array<infer X> ? X : never;
type RegistryItem = ArrayItem<Registry>;

export async function buildRegistry(registryRoot: string) {
  const uiPath = resolve(registryRoot, 'tailwind/ui');
  const uiRegistry = await crawlUI(uiPath);

  const examplePath = resolve(registryRoot, 'tailwind/example');
  const exampleRegistry = await crawlDirectory(examplePath, 'example');

  const blockPath = resolve(registryRoot, 'tailwind/block');
  const blockRegistry = await crawlDirectory(blockPath, 'block');

  return uiRegistry.concat(exampleRegistry).concat(blockRegistry);
}

async function crawlUI(rootPath: string) {
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

    const ui = await buildUIRegistry(componentPath, dirent.name);
    uiRegistry.push(ui);
  }

  return uiRegistry;
}

async function crawlDirectory(rootPath: string, typeName: 'example' | 'block') {
  const type = `components:${typeName}` as const;

  const dir = await readdir(rootPath, {
    recursive: true,
    withFileTypes: true,
  });

  const registry: Registry = [];

  for (const dirent of dir) {
    if (dirent.name === 'index.ts') {
      continue;
    }

    if (dirent.isFile()) {
      const [name] = dirent.name.split('.vue');
      const file_path = join(typeName, normalize(dirent.path).split(`/${typeName}`)[1], dirent.name);
      const { dependencies, registryDependencies }
      = await getDependencies(join(dirent.path, dirent.name));

      registry.push({
        name,
        type,
        files: [file_path],
        registryDependencies: Array.from(registryDependencies),
        dependencies: Array.from(dependencies),
      });
    }

    // ignoring examples with directories for now

    // if (dirent.isDirectory()) {
    //  const componentPath = resolve(rootPath, dirent.name);
    //  const ui = await buildUIRegistry(componentPath, dirent.name);
    //  registry.push({
    //    ...ui,
    //    type
    //  });
    // }
  }

  return registry;
}

async function buildUIRegistry(componentPath: string, componentName: string) {
  const dir = await readdir(componentPath, {
    withFileTypes: true,
  });

  const files: string[] = [];
  const dependencies = new Set<string>();
  const registryDependencies = new Set<string>();
  const type = 'components:ui';

  for (const dirent of dir) {
    if (!dirent.isFile()) {
      continue;
    }

    const file_path = join(componentName, dirent.name);
    files.push(file_path);
    files.sort();

    // only grab deps from the vue files
    if (dirent.name === 'index.ts') {
      continue;
    }

    const deps = await getDependencies(join(componentPath, dirent.name));
    deps.dependencies.forEach(dep => dependencies.add(dep));
    deps.registryDependencies.forEach(dep =>
      registryDependencies.add(dep),
    );
  }

  return {
    name: componentName,
    type,
    files,
    registryDependencies: Array.from(registryDependencies),
    dependencies: Array.from(dependencies),
  } satisfies RegistryItem;
}

async function getDependencies(filename: string) {
  const code = await readFile(filename, { encoding: 'utf8' });

  const registryDependencies = new Set<string>();
  const dependencies = new Set<string>();

  const populateDeps = (source: string) => {
    const peerDeps = DEPENDENCIES.get(source);

    if (peerDeps !== undefined) {
      dependencies.add(source);
      peerDeps.forEach(dep => dependencies.add(dep));
    }

    if (source.startsWith(REGISTRY_DEPENDENCY)) {
      const component = source.split('/').at(-1)!;
      registryDependencies.add(component);
    }
  };

  getImportSources(code, filename).forEach(populateDeps);

  return { registryDependencies, dependencies };
}
