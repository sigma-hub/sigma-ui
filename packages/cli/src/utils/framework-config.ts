import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'pathe';
import { builders, generateCode, parseModule, type ProxifiedModule } from 'magicast';
import { addVitePlugin, getDefaultExportOptions } from 'magicast/helpers';
import type { Framework } from '@/src/schemas';

export type ConfigUpdateResult =
  | { status: 'updated' | 'unchanged'; file: string }
  | { status: 'not-found' }
  | { status: 'failed'; file: string; reason: string };

const TAILWIND_VITE_PLUGIN = { from: '@tailwindcss/vite', constructor: 'tailwindcss' };

const CONFIG_FILES: Record<Framework, string[]> = {
  vite: ['vite.config.ts', 'vite.config.mts', 'vite.config.js', 'vite.config.mjs'],
  laravel: ['vite.config.ts', 'vite.config.js', 'vite.config.mjs'],
  nuxt: ['nuxt.config.ts', 'nuxt.config.js', 'nuxt.config.mjs'],
  astro: ['astro.config.mjs', 'astro.config.ts', 'astro.config.js'],
};

const ENTRY_FILES = ['src/main.ts', 'src/main.js', 'src/main.mts'];

export function findFrameworkConfigFile(cwd: string, framework: Framework) {
  const fileName = CONFIG_FILES[framework].find(candidate => existsSync(path.join(cwd, candidate)));
  return fileName ? path.join(cwd, fileName) : null;
}

async function updateModule(
  file: string,
  update: (module: ProxifiedModule, source: string) => boolean,
): Promise<ConfigUpdateResult> {
  const source = await readFile(file, 'utf8');

  try {
    const module = parseModule(source);

    if (!update(module, source)) {
      return { status: 'unchanged', file };
    }

    await writeFile(file, generateCode(module).code, 'utf8');
    return { status: 'updated', file };
  } catch (error) {
    return { status: 'failed', file, reason: error instanceof Error ? error.message : String(error) };
  }
}

function usesFrameworkViteKey(framework: Framework) {
  return framework === 'nuxt' || framework === 'astro';
}

export async function registerTailwindVitePlugin(cwd: string, framework: Framework): Promise<ConfigUpdateResult> {
  const file = findFrameworkConfigFile(cwd, framework);

  if (!file) {
    return { status: 'not-found' };
  }

  return updateModule(file, (module, source) => {
    if (source.includes(TAILWIND_VITE_PLUGIN.from)) {
      return false;
    }

    if (!usesFrameworkViteKey(framework)) {
      return addVitePlugin(module, TAILWIND_VITE_PLUGIN);
    }

    const options = getDefaultExportOptions(module);
    options.vite ||= {};
    options.vite.plugins ||= [];
    options.vite.plugins.push(builders.functionCall(TAILWIND_VITE_PLUGIN.constructor));
    module.imports.$prepend({ from: TAILWIND_VITE_PLUGIN.from, local: TAILWIND_VITE_PLUGIN.constructor, imported: 'default' });
    return true;
  });
}

export async function registerNuxtCss(cwd: string, cssEntry: string): Promise<ConfigUpdateResult> {
  const file = findFrameworkConfigFile(cwd, 'nuxt');

  if (!file) {
    return { status: 'not-found' };
  }

  return updateModule(file, (module) => {
    const options = getDefaultExportOptions(module);
    options.css ||= [];

    if ([...options.css].includes(cssEntry)) {
      return false;
    }

    options.css.push(cssEntry);
    return true;
  });
}

export function getNuxtCssEntry(cwd: string, cssPath: string) {
  const sourceDirectory = existsSync(path.join(cwd, 'app')) ? path.join(cwd, 'app') : cwd;
  const relativePath = path.relative(sourceDirectory, path.resolve(cwd, cssPath));
  return relativePath.startsWith('..') ? path.resolve(cwd, cssPath) : `~/${relativePath}`;
}

export async function importCssInViteEntry(cwd: string, cssPath: string): Promise<ConfigUpdateResult> {
  const entryName = ENTRY_FILES.find(candidate => existsSync(path.join(cwd, candidate)));

  if (!entryName) {
    return { status: 'not-found' };
  }

  const file = path.join(cwd, entryName);
  const source = await readFile(file, 'utf8');
  let specifier = path.relative(path.dirname(file), path.resolve(cwd, cssPath));
  specifier = specifier.startsWith('.') ? specifier : `./${specifier}`;

  if (source.includes(specifier)) {
    return { status: 'unchanged', file };
  }

  await writeFile(file, `import '${specifier}';\n${source}`, 'utf8');
  return { status: 'updated', file };
}
