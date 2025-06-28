import fs from 'node:fs';
import path from 'pathe';
import type * as z from 'zod';
import { baseColors } from '../../../../../apps/docs/src/lib/registry/colors';
import {
  registryBaseColorSchema,
  registryIndexSchema,
  registryItemWithContentSchema,
  registryWithContentSchema,
  stylesSchema,
  type Config,
} from '@/src/schemas';

const REGISTRY_PATH = new URL('../__generated/registry-schemes/', import.meta.url);

const DIRS = {
  STYLE_SYSTEM: 'style-system',
  COLORS: 'colors',
} as const;

const filePaths = {
  index: () => `index.json`,
  styles: () => `${DIRS.STYLE_SYSTEM}/index.json`,
  baseColors: (baseColor: string) => `${DIRS.COLORS}/${baseColor}.json`,
  selectedStyleComponent: (params: { styleSystem: string; componentName: string }) => (
    `${DIRS.STYLE_SYSTEM}/${params.styleSystem}/${params.componentName}.json`
  ),
};

export function getRegistryBaseColors() {
  return baseColors;
}

export async function getSchemeFileData(filePath: string) {
  const filePathUrl = new URL(filePath, REGISTRY_PATH);
  const fileData = await fs.promises.readFile(filePathUrl, 'utf8');
  const jsonObject = JSON.parse(fileData);
  return jsonObject;
}

export async function getRegistryIndex() {
  try {
    const fileData = await getSchemeFileData(filePaths.index());
    return registryIndexSchema.parse(fileData);
  } catch (error) {
    console.error('Error reading components data:', error);
    throw new Error('Failed to load components from registry.');
  }
}

export async function getRegistryStyles() {
  try {
    const fileData = await getSchemeFileData(filePaths.styles());
    return stylesSchema.parse(fileData);
  } catch (error) {
    console.error('Error reading styles data:', error);
    throw new Error('Failed to load styles from registry.');
  }
}

export async function getRegistryBaseColor(baseColor: string) {
  try {
    const fileData = await getSchemeFileData(filePaths.baseColors(baseColor));

    return registryBaseColorSchema.parse(fileData);
  } catch (error) {
    console.error('Error reading base color data:', error);
    throw new Error('Failed to load base color from registry.');
  }
}

export async function fetchTree(
  styleSystem: string,
  tree: z.infer<typeof registryIndexSchema>,
) {
  try {
    const results = await Promise.all(
      tree.map(async (component) => {
        const fileData = await getSchemeFileData(filePaths.selectedStyleComponent({ styleSystem, componentName: component.name }));
        return fileData;
      }),
    );
    return registryWithContentSchema.parse(results);
  } catch (error) {
    throw new Error(`Failed to load tree from registry. ${error}`);
  }
}

export async function resolveTree(
  index: z.infer<typeof registryIndexSchema>,
  names: string[],
) {
  const tree: z.infer<typeof registryIndexSchema> = [];

  for (const name of names) {
    const entry = index.find(entry => entry.name === name);

    if (!entry) {
      continue;
    }

    tree.push(entry);

    if (entry.registryDependencies) {
      const dependencies = await resolveTree(index, entry.registryDependencies);
      tree.push(...dependencies);
    }
  }

  return tree.filter(
    (component, index, self) =>
      self.findIndex(c => c.name === component.name) === index,
  );
}

export function getItemTargetPath(
  config: Config,
  item: Pick<z.infer<typeof registryItemWithContentSchema>, 'type'>,
  override?: string,
) {
  if (override) {
    return override;
  }

  if (item.type === 'components:ui' && config.aliases.components) {
    return config.resolvedPaths.components;
  }

  const [parent, type] = item.type.split(':');

  if (!(parent in config.resolvedPaths)) {
    return null;
  }

  return path.join(
    config.resolvedPaths[parent as keyof typeof config.resolvedPaths] ?? '',
    type,
  );
}
