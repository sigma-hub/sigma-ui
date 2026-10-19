import fs from 'node:fs';
import path from 'node:path';
import { rimraf } from 'rimraf';
import { styleSystems } from '@sigma-ui/shared/style-systems';
import { crawlRegistry, getImportSources, toPublicImports, writeRegistry } from '@sigma-ui/shared/registry';
import { createConfigJsonSchema, type RegistryItem } from '@sigma-ui/shared/schemas';

const DOCS_ROOT = process.cwd();
const LIB_REGISTRY_PATH = path.join(DOCS_ROOT, '../../packages/lib/src/registry');
const PUBLIC_REGISTRY_PATH = path.join(DOCS_ROOT, 'src/public/r');
const GENERATED_INDEX_PATH = path.join(DOCS_ROOT, '__generated/index.ts');
const CONFIG_SCHEMA_PATH = path.join(DOCS_ROOT, 'src/public/schema.json');
const COMPONENT_PAGES_PATH = path.join(DOCS_ROOT, 'src/content/components');
const PUBLISHED_TYPES = new Set<RegistryItem['type']>(['registry:ui', 'registry:block', 'registry:example']);

function kebabCase(name: string) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function componentPagePath(name: string) {
  if (name === 'chart') {
    return path.join(COMPONENT_PAGES_PATH, 'charts.md');
  }

  if (name.startsWith('chart-')) {
    return path.join(COMPONENT_PAGES_PATH, 'charts', `${name.slice('chart-'.length)}.md`);
  }

  return path.join(COMPONENT_PAGES_PATH, `${name}.md`);
}

function readFrontmatter(name: string) {
  const pagePath = componentPagePath(name);

  if (!fs.existsSync(pagePath)) {
    return {};
  }

  const frontmatter = /^---\n([\s\S]*?)\n---/.exec(fs.readFileSync(pagePath, 'utf8'))?.[1] ?? '';

  const field = (key: string) => {
    const value = new RegExp(`^${key}:\\s*(.+)$`, 'm').exec(frontmatter)?.[1]?.trim();
    return value?.replace(/^(['"])(.*)\1$/, '$2') || undefined;
  };

  return { title: field('title'), description: field('description') };
}

/** Gives components the title and description of their docs page, so registry search can match them. */
function describeComponents(items: RegistryItem[]) {
  return items.map(item => (item.type === 'registry:ui' ? { ...item, ...readFrontmatter(item.name) } : item));
}

/**
 * Publishes examples under kebab-case names (`ButtonWithIcon` -> `button-with-icon`). An example named like a
 * component or block becomes `<name>-demo`, or `<name>-example` when that name is taken too. Sibling files an example imports (`./CustomChartTooltip.vue`) ship with it.
 */
function publicExamples(items: RegistryItem[], styleRoot: string): RegistryItem[] {
  const examples = items.filter(item => item.type === 'registry:example');
  const byPath = new Map(examples.map(item => [item.files?.[0]?.path ?? '', item]));
  const reserved = new Set(items.filter(item => item.type !== 'registry:example').map(item => item.name));
  const exampleNames = new Set(examples.map(item => kebabCase(item.name)));

  const publicName = (name: string) => {
    if (!reserved.has(name)) {
      return name;
    }

    return exampleNames.has(`${name}-demo`) ? `${name}-example` : `${name}-demo`;
  };

  const collect = (item: RegistryItem, seen: Set<RegistryItem>) => {
    if (seen.has(item)) {
      return;
    }

    seen.add(item);
    const filePath = item.files?.[0]?.path ?? '';
    const absolutePath = path.join(styleRoot, filePath);
    const relativeImports = getImportSources(fs.readFileSync(absolutePath, 'utf8'), absolutePath)
      .filter(source => source.startsWith('./') || source.startsWith('../'));

    for (const source of relativeImports) {
      const sibling = byPath.get(path.posix.join(path.posix.dirname(filePath), source));

      if (!sibling) {
        throw new Error(`Example "${item.name}" imports "${source}", which is not an example file.`);
      }

      collect(sibling, seen);
    }
  };

  return examples.map((example) => {
    const related = new Set<RegistryItem>();
    collect(example, related);
    const parts = [...related];
    const baseName = kebabCase(example.name);
    const fileNames = parts.map(part => path.posix.basename(part.files?.[0]?.path ?? ''));
    const duplicate = fileNames.find((fileName, index) => fileNames.indexOf(fileName) !== index);

    if (duplicate) {
      throw new Error(`Example "${example.name}" has two files named ${duplicate}. The CLI installs an example into one folder.`);
    }

    return {
      ...example,
      name: publicName(baseName),
      title: example.name,
      files: parts.flatMap(part => part.files ?? []),
      dependencies: [...new Set(parts.flatMap(part => part.dependencies ?? []))].sort(),
      registryDependencies: [...new Set(parts.flatMap(part => part.registryDependencies ?? []))].sort(),
    };
  });
}

const RELATIVE_SPECIFIER_PATTERN = /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(['"])(\.{1,2}\/[^'"]+)\2/g;

/**
 * The CLI installs an example and the files it imports into one folder, so `../DataTableMenu.vue`
 * from `example/Cards/DataTable.vue` is published as `./DataTableMenu.vue`.
 */
export function flattenExampleImports(content: string) {
  return content.replace(RELATIVE_SPECIFIER_PATTERN, (_match, prefix: string, quote: string, specifier: string) => (
    `${prefix}${quote}./${path.posix.basename(specifier)}${quote}`
  ));
}

function buildGeneratedIndex(registries: Record<string, RegistryItem[]>) {
  let index = `// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
export const Index = {
`;

  for (const style of styleSystems) {
    index += `  "${style.name}": {`;

    for (const item of registries[style.name]) {
      if (!['registry:example', 'registry:block'].includes(item.type)) {
        continue;
      }

      index += `
    "${item.name}": {
      name: "${item.name}",
      type: "${item.type}",
      registryDependencies: ${JSON.stringify(item.registryDependencies ?? [])},
      dependencies: ${JSON.stringify(item.dependencies ?? [])},
      files: ${JSON.stringify((item.files ?? []).map(file => file.path))},
    },`;
    }

    index += `
  },
`;
  }

  index += `};
`;

  fs.mkdirSync(path.dirname(GENERATED_INDEX_PATH), { recursive: true });
  fs.writeFileSync(GENERATED_INDEX_PATH, index);
}

async function buildPublicRegistry(registries: Record<string, RegistryItem[]>) {
  rimraf.sync(PUBLIC_REGISTRY_PATH);

  for (const style of styleSystems) {
    await writeRegistry({
      registry: {
        name: 'sigma-ui',
        homepage: 'https://sigma-ui.dev',
        items: [
          ...describeComponents(registries[style.name].filter(item => item.type !== 'registry:example')),
          ...publicExamples(registries[style.name], path.join(LIB_REGISTRY_PATH, style.name)),
        ].filter(item => PUBLISHED_TYPES.has(item.type)),
      },
      sourceRoot: path.join(LIB_REGISTRY_PATH, style.name),
      outputDirectory: path.join(PUBLIC_REGISTRY_PATH, style.name),
      transformContent: (content, _file, item) => (
        item.type === 'registry:example' ? flattenExampleImports(toPublicImports(content)) : toPublicImports(content)
      ),
    });
  }
}

function buildConfigSchema() {
  const { $schema, ...schema } = createConfigJsonSchema();
  fs.writeFileSync(CONFIG_SCHEMA_PATH, `${JSON.stringify({ $schema, title: 'sigma-ui.config.json', ...schema }, null, 2)}\n`, 'utf8');
}

async function main() {
  const registries = await crawlRegistry({
    registryRoot: LIB_REGISTRY_PATH,
    styles: styleSystems.map(style => style.name),
  });

  buildGeneratedIndex(registries);
  await buildPublicRegistry(registries);
  buildConfigSchema();
  console.log('Registry built.');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
