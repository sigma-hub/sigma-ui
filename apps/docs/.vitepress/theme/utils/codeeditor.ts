import { getParameters } from 'codesandbox/lib/api/define';
import sdk from '@stackblitz/sdk';
import { PREFLIGHT_CSS_TEMPLATE } from '@sigma-ui/shared/templates/preflight';
import { Index } from '../../../__generated';
import { assemblePlaygroundFiles, createPlaygroundStylesheet, type PlaygroundItem, type PlaygroundProjectFile } from './playground';
import type { StyleSystem } from '@sigma-ui/shared/style-systems';

interface RegistryItemResponse extends PlaygroundItem {
  registryDependencies?: string[];
}

function registryDependencies(componentName: string, styleSystem: StyleSystem) {
  const styleIndex = Index[styleSystem] as Record<string, { registryDependencies?: string[] }>;
  return (styleIndex[componentName]?.registryDependencies ?? []).filter(name => name !== 'utils');
}

async function fetchRegistryItem(styleSystem: StyleSystem, name: string): Promise<RegistryItemResponse | null> {
  const response = await fetch(`/r/${styleSystem}/${name}.json`);

  if (!response.ok) {
    return null;
  }

  return response.json() as Promise<RegistryItemResponse>;
}

async function loadRegistryItems(styleSystem: StyleSystem, names: string[], seen = new Set<string>()): Promise<RegistryItemResponse[]> {
  const items: RegistryItemResponse[] = [];

  for (const name of names) {
    if (seen.has(name)) {
      continue;
    }

    seen.add(name);
    const item = await fetchRegistryItem(styleSystem, name);

    if (!item) {
      continue;
    }

    items.push(item, ...await loadRegistryItems(styleSystem, item.registryDependencies ?? [], seen));
  }

  return items;
}

export async function createPlaygroundFiles(componentName: string, styleSystem: StyleSystem, demoCode: string) {
  const items = await loadRegistryItems(styleSystem, registryDependencies(componentName, styleSystem));

  return assemblePlaygroundFiles({
    styleSystem,
    componentName,
    demoCode,
    items,
    css: createPlaygroundStylesheet(styleSystem),
    preflight: styleSystem === 'css' ? PREFLIGHT_CSS_TEMPLATE : undefined,
  });
}

export function makeCodeSandboxParams(files: Record<string, PlaygroundProjectFile>) {
  return getParameters({ files, template: 'node' });
}

export function openInStackblitz(componentName: string, files: Record<string, PlaygroundProjectFile>) {
  const projectFiles: Record<string, string> = {};

  for (const [filePath, file] of Object.entries(files)) {
    projectFiles[filePath] = file.content;
  }

  return sdk.openProject({
    title: `${componentName} - SIGMA-UI`,
    files: projectFiles,
    template: 'node',
  }, {
    newWindow: true,
    openFile: ['src/App.vue'],
  });
}
