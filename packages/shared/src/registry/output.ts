import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'pathe';
import {
  REGISTRY_ITEM_SCHEMA_URL,
  REGISTRY_SCHEMA_URL,
  registryItemSchema,
  registrySchema,
  type Registry,
  type RegistryItem,
  type RegistryItemFile,
} from '../schemas/registry';

export const REGISTRY_INDEX_NAME = 'registry';

const SAFE_ITEM_NAME_PATTERN = /^[a-z0-9][\w.-]*$/i;

export interface WriteRegistryOptions {
  registry: Registry;
  sourceRoot: string;
  outputDirectory: string;
  transformContent?: RegistryContentTransform;
}

export type RegistryContentTransform = (content: string, file: RegistryItemFile, item: RegistryItem) => string;

export function resolveRegistrySourceFile(sourceRoot: string, filePath: string, itemName: string) {
  const absolutePath = resolve(sourceRoot, filePath);
  const relativePath = relative(sourceRoot, absolutePath);

  if (relativePath.startsWith('..')) {
    throw new Error(`"${itemName}" references ${filePath}, which is outside ${sourceRoot}.`);
  }

  if (existsSync(absolutePath)) {
    return absolutePath;
  }

  const sharedRoot = resolve(sourceRoot, '../shared');
  const sharedPath = resolve(sharedRoot, filePath);
  const sharedRelative = relative(sharedRoot, sharedPath);

  if (!sharedRelative.startsWith('..') && existsSync(sharedPath)) {
    return sharedPath;
  }

  return absolutePath;
}

export async function withFileContents(
  sourceRoot: string,
  item: RegistryItem,
  transformContent: RegistryContentTransform = content => content,
): Promise<RegistryItem> {
  const files = await Promise.all((item.files ?? []).map(async (file) => {
    const content = await readFile(resolveRegistrySourceFile(sourceRoot, file.path, item.name), 'utf8');
    return { ...file, content: transformContent(content.replace(/\r\n/g, '\n'), file, item) };
  }));

  return { ...item, files };
}

async function writeJson(filePath: string, data: unknown) {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

export async function writeRegistry(options: WriteRegistryOptions): Promise<string[]> {
  const { registry, sourceRoot, outputDirectory, transformContent } = options;
  const writtenFiles: string[] = [];
  const seenNames = new Set<string>();

  for (const item of registry.items) {
    if (!SAFE_ITEM_NAME_PATTERN.test(item.name) || item.name === REGISTRY_INDEX_NAME) {
      throw new Error(`"${item.name}" is not a valid registry item name. Use letters, digits, dots, dashes, and underscores.`);
    }

    if (seenNames.has(item.name)) {
      throw new Error(`The registry contains "${item.name}" more than once.`);
    }

    seenNames.add(item.name);

    const itemWithContent = registryItemSchema.parse({
      $schema: REGISTRY_ITEM_SCHEMA_URL,
      ...await withFileContents(sourceRoot, item, transformContent),
    });
    const itemPath = join(outputDirectory, `${item.name}.json`);

    await writeJson(itemPath, itemWithContent);
    writtenFiles.push(itemPath);
  }

  const indexPath = join(outputDirectory, `${REGISTRY_INDEX_NAME}.json`);
  const index = registrySchema.parse({
    ...registry,
    $schema: REGISTRY_SCHEMA_URL,
    items: registry.items.map(item => ({
      ...item,
      files: item.files?.map(file => ({ path: file.path, type: file.type, target: file.target })),
    })),
  });

  await writeJson(indexPath, index);
  writtenFiles.push(indexPath);

  return writtenFiles;
}
