import { existsSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import { basename, extname, join, relative, resolve } from 'pathe';
import type { RegistryItem, RegistryItemFile, RegistryItemType } from '../schemas/registry';
import { getImportSources } from './imports';
import { classifyImportSources } from './dependencies';
import { readPackageVersions } from './package-versions';

export interface BlockManifestEntry {
  name: string;
  title: string;
  description: string;
  categories: string[];
  meta?: Record<string, unknown>;
}

export interface CrawlRegistryOptions {
  registryRoot: string;
  styles: readonly string[];
  packageJsonPath?: string;
}

export type StyleRegistries = Record<string, RegistryItem[]>;

const UI_DIRECTORY = 'ui';
const BLOCKS_DIRECTORY = 'blocks';
const EXAMPLES_DIRECTORY = 'example';
const BLOCK_MANIFEST_FILE = 'blocks.json';

async function listFiles(directory: string): Promise<string[]> {
  if (!existsSync(directory)) {
    return [];
  }

  const entries = await readdir(directory, { recursive: true, withFileTypes: true });

  return entries
    .filter(entry => entry.isFile())
    .map(entry => relative(directory, join(entry.parentPath, entry.name)))
    .sort();
}

async function listDirectories(directory: string): Promise<string[]> {
  if (!existsSync(directory)) {
    return [];
  }

  const entries = await readdir(directory, { withFileTypes: true });
  return entries.filter(entry => entry.isDirectory()).map(entry => entry.name).sort();
}

function getBlockFileType(filePath: string): RegistryItemType {
  return extname(filePath) === '.vue' ? 'registry:component' : 'registry:lib';
}

async function readBlockManifest(registryRoot: string): Promise<BlockManifestEntry[]> {
  const manifestPath = join(registryRoot, BLOCK_MANIFEST_FILE);

  if (!existsSync(manifestPath)) {
    return [];
  }

  return JSON.parse(await readFile(manifestPath, 'utf8'));
}

async function getItemDependencies(styleRoot: string, files: RegistryItemFile[], itemName: string, packageVersions: Record<string, string>) {
  const sources = await Promise.all(files.map(async (file) => {
    const filename = join(styleRoot, file.path);
    return getImportSources(await readFile(filename, 'utf8'), filename);
  }));

  return classifyImportSources(sources.flat(), { itemName, packageVersions });
}

async function createItem(
  styleRoot: string,
  item: Omit<RegistryItem, 'files'> & { files: RegistryItemFile[] },
  packageVersions: Record<string, string>,
): Promise<RegistryItem> {
  const { dependencies, registryDependencies } = await getItemDependencies(styleRoot, item.files, item.name, packageVersions);

  return {
    ...item,
    registryDependencies,
    dependencies,
  };
}

async function crawlUi(styleRoot: string, packageVersions: Record<string, string>) {
  const uiRoot = join(styleRoot, UI_DIRECTORY);
  const names = await listDirectories(uiRoot);

  return Promise.all(names.map(async (name) => {
    const filePaths = await listFiles(join(uiRoot, name));

    return createItem(styleRoot, {
      name,
      type: 'registry:ui',
      files: filePaths.map(filePath => ({ path: join(UI_DIRECTORY, name, filePath), type: 'registry:ui' })),
    }, packageVersions);
  }));
}

async function crawlBlocks(styleRoot: string, manifest: BlockManifestEntry[], packageVersions: Record<string, string>) {
  const blocksRoot = join(styleRoot, BLOCKS_DIRECTORY);
  const names = await listDirectories(blocksRoot);

  return Promise.all(names.map(async (name) => {
    const manifestEntry = manifest.find(entry => entry.name === name);

    if (!manifestEntry) {
      throw new Error(`Block "${name}" is missing from ${BLOCK_MANIFEST_FILE}.`);
    }

    const filePaths = await listFiles(join(blocksRoot, name));

    return createItem(styleRoot, {
      name,
      type: 'registry:block',
      title: manifestEntry.title,
      description: manifestEntry.description,
      categories: manifestEntry.categories,
      meta: manifestEntry.meta,
      files: filePaths.map((filePath) => {
        const path = join(BLOCKS_DIRECTORY, name, filePath);
        return { path, type: getBlockFileType(path) };
      }),
    }, packageVersions);
  }));
}

async function crawlExamples(styleRoot: string, packageVersions: Record<string, string>) {
  const examplesRoot = join(styleRoot, EXAMPLES_DIRECTORY);
  const filePaths = (await listFiles(examplesRoot)).filter(filePath => filePath.endsWith('.vue'));

  return Promise.all(filePaths.map(filePath => createItem(styleRoot, {
    name: basename(filePath, '.vue'),
    type: 'registry:example',
    files: [{ path: join(EXAMPLES_DIRECTORY, filePath), type: 'registry:example' }],
  }, packageVersions)));
}

export function findStyleMismatches(registries: StyleRegistries): string[] {
  const [referenceStyle, ...otherStyles] = Object.keys(registries);
  const mismatches: string[] = [];

  if (!referenceStyle) {
    return mismatches;
  }

  const describeItems = (items: RegistryItem[]) => new Map(
    items.map(item => [`${item.type} ${item.name}`, (item.files ?? []).map(file => file.path).join('\n')]),
  );
  const reference = describeItems(registries[referenceStyle]);

  for (const style of otherStyles) {
    const current = describeItems(registries[style]);

    for (const [key, files] of reference) {
      if (!current.has(key)) {
        mismatches.push(`${key} exists in "${referenceStyle}" but not in "${style}"`);
      } else if (current.get(key) !== files) {
        mismatches.push(`${key} has different files in "${referenceStyle}" and "${style}"`);
      }
    }

    for (const key of current.keys()) {
      if (!reference.has(key)) {
        mismatches.push(`${key} exists in "${style}" but not in "${referenceStyle}"`);
      }
    }
  }

  return mismatches;
}

export async function crawlRegistry(options: CrawlRegistryOptions): Promise<StyleRegistries> {
  const registryRoot = resolve(options.registryRoot);
  const packageVersions = readPackageVersions(options.packageJsonPath ?? resolve(registryRoot, '../../package.json'));
  const manifest = await readBlockManifest(registryRoot);
  const registries: StyleRegistries = {};

  for (const style of options.styles) {
    const styleRoot = join(registryRoot, style);
    registries[style] = [
      ...await crawlUi(styleRoot, packageVersions),
      ...await crawlBlocks(styleRoot, manifest, packageVersions),
      ...await crawlExamples(styleRoot, packageVersions),
    ];
  }

  const mismatches = findStyleMismatches(registries);

  if (mismatches.length) {
    throw new Error(`Style trees are out of sync:\n- ${mismatches.join('\n- ')}`);
  }

  return registries;
}

export function toPublicImports(content: string) {
  return content
    .replace(/(['"])@ui\/registry\/[^/'"]+\/ui\//g, '$1@/components/ui/')
    .replace(/(['"])@ui\/utils(['"])/g, '$1@/lib/utils$2');
}
