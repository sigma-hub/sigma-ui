import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { classifyImportSources, getImportSources } from '../../../../../packages/shared/src/registry';
import { type StyleSystem, styleSystems } from '../../../../../packages/shared/src/style-systems';

export const REPO_ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '../../../../..');
export const REGISTRY_ROOT = path.join(REPO_ROOT, 'packages/lib/src/registry');
export const STYLE_SYSTEMS: StyleSystem[] = styleSystems.map(style => style.name);

const SOURCE_EXTENSIONS = ['.vue', '.ts'];

export interface SourceFile {
  fileName: string;
  content: string;
}

export interface RenderedSourceFile {
  name: string;
  html: string;
}

export interface ComponentDependencies {
  packages: string[];
  components: string[];
  usesUtils: boolean;
}

export function getComponentDir(style: StyleSystem, component: string) {
  return path.join(REGISTRY_ROOT, style, 'ui', component);
}

export function getExamplePath(style: StyleSystem, exampleName: string) {
  return path.join(REGISTRY_ROOT, style, 'example', `${exampleName}.vue`);
}

export function componentExists(component: string) {
  return STYLE_SYSTEMS.every(style => fs.existsSync(getComponentDir(style, component)));
}

export function exampleExists(exampleName: string) {
  return STYLE_SYSTEMS.every(style => fs.existsSync(getExamplePath(style, exampleName)));
}

function compareSourceFiles(first: SourceFile, second: SourceFile) {
  const firstIsVue = first.fileName.endsWith('.vue');
  const secondIsVue = second.fileName.endsWith('.vue');

  if (firstIsVue !== secondIsVue) {
    return firstIsVue ? -1 : 1;
  }

  return first.fileName.localeCompare(second.fileName);
}

export function readComponentFiles(style: StyleSystem, component: string): SourceFile[] {
  const componentDir = getComponentDir(style, component);

  return fs.readdirSync(componentDir)
    .filter(fileName => SOURCE_EXTENSIONS.includes(path.extname(fileName)))
    .map(fileName => ({ fileName, content: fs.readFileSync(path.join(componentDir, fileName), 'utf-8') }))
    .sort(compareSourceFiles);
}

export function readExample(style: StyleSystem, exampleName: string) {
  return fs.readFileSync(getExamplePath(style, exampleName), 'utf-8').trim();
}

export function collectDependencies(files: SourceFile[], ownComponent: string): ComponentDependencies {
  const sources = files.flatMap(file => getImportSources(file.content, file.fileName));
  const { dependencies, registryDependencies } = classifyImportSources(sources, { itemName: ownComponent });

  return {
    packages: dependencies,
    components: registryDependencies,
    usesUtils: sources.includes('@ui/utils'),
  };
}
