import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_COMPONENTS, DEFAULT_UTILS } from '../../../../../packages/shared/consts';
import { type StyleSystem, styleSystems } from '../../../src/lib/registry/style-system';

export const REPO_ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '../../../../..');
export const REGISTRY_ROOT = path.join(REPO_ROOT, 'packages/lib/src/registry');
export const STYLE_SYSTEMS: StyleSystem[] = styleSystems.map(style => style.name);

const SOURCE_EXTENSIONS = ['.vue', '.ts'];
const IMPORT_SPECIFIER_PATTERN = /(?:import|export)\s[^'"]*?from\s*['"]([^'"]+)['"]|import\s*['"]([^'"]+)['"]/g;
const REGISTRY_COMPONENT_PATTERN = /^@ui\/registry\/[^/]+\/ui\/([^/]+)/;
const BUILT_IN_MODULES = ['vue'];

export interface SourceFile {
  fileName: string;
  content: string;
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

export function toDisplayCode(code: string, style: StyleSystem) {
  return code
    .replaceAll(`@ui/registry/${style}/ui`, DEFAULT_COMPONENTS)
    .replaceAll('@ui/utils', DEFAULT_UTILS);
}

function getPackageName(specifier: string) {
  const segments = specifier.split('/');
  return specifier.startsWith('@') ? segments.slice(0, 2).join('/') : segments[0];
}

export function collectDependencies(files: SourceFile[], ownComponent: string): ComponentDependencies {
  const packages = new Set<string>();
  const components = new Set<string>();
  let usesUtils = false;

  for (const file of files) {
    for (const match of file.content.matchAll(IMPORT_SPECIFIER_PATTERN)) {
      const specifier = match[1] ?? match[2];
      const registryComponent = specifier.match(REGISTRY_COMPONENT_PATTERN)?.[1];

      if (specifier === '@ui/utils') {
        usesUtils = true;
      } else if (registryComponent) {
        if (registryComponent !== ownComponent) {
          components.add(registryComponent);
        }
      } else if (!specifier.startsWith('.') && !specifier.startsWith('@ui/') && !BUILT_IN_MODULES.includes(specifier)) {
        packages.add(getPackageName(specifier));
      }
    }
  }

  return {
    packages: [...packages].sort(),
    components: [...components].sort(),
    usesUtils,
  };
}
