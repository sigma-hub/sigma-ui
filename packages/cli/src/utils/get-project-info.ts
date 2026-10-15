import { existsSync } from 'node:fs';
import path from 'pathe';
import { readPackageJSON } from 'pkg-types';

export type Framework = 'vite' | 'nuxt' | 'laravel' | 'astro';

export type TailwindConfigType = 'css' | 'js' | 'none';

export interface ProjectInfo {
  framework: Framework;
  tsConfigPath: string;
  srcDir: boolean;
  srcComponentsUiDir: boolean;
  componentsUiDir: boolean;
  hasTailwind: boolean;
  tailwindConfigType: TailwindConfigType;
  tailwindConfigPath: string | null;
  hasSigmaUiNuxtModule: boolean;
}

export async function getProjectInfo(cwd: string = process.cwd()): Promise<ProjectInfo> {
  const framework = detectFramework(cwd);
  const tsConfigPath = detectTsConfigPath(cwd, framework);
  const dependencies = await readDependencyNames(cwd);
  const { configType: tailwindConfigType, configPath: tailwindConfigPath } = detectTailwindConfigType(cwd);

  return {
    framework,
    tsConfigPath,
    srcDir: existsSync(path.resolve(cwd, 'src')),
    srcComponentsUiDir: existsSync(path.resolve(cwd, 'src/components/ui')),
    componentsUiDir: existsSync(path.resolve(cwd, 'components/ui')),
    hasTailwind: dependencies.has('tailwindcss'),
    tailwindConfigType,
    tailwindConfigPath,
    hasSigmaUiNuxtModule: framework === 'nuxt' && dependencies.has('sigma-ui-nuxt'),
  };
}

function detectTailwindConfigType(cwd: string): { configType: TailwindConfigType; configPath: string | null } {
  const jsConfigPaths = [
    'tailwind.config.js',
    'tailwind.config.ts',
    'tailwind.config.mjs',
    'tailwind.config.cjs',
  ];

  for (const configPath of jsConfigPaths) {
    if (existsSync(path.resolve(cwd, configPath))) {
      return { configType: 'js', configPath };
    }
  }

  return { configType: 'css', configPath: null };
}

function detectFramework(cwd: string): Framework {
  if (existsSync(path.resolve(cwd, 'nuxt.config.js')) || existsSync(path.resolve(cwd, 'nuxt.config.ts'))) {
    return 'nuxt';
  }

  if (existsSync(path.resolve(cwd, 'astro.config.mjs')) || existsSync(path.resolve(cwd, 'astro.config.ts'))) {
    return 'astro';
  }

  if (existsSync(path.resolve(cwd, 'artisan'))) {
    return 'laravel';
  }

  return 'vite';
}

function detectTsConfigPath(cwd: string, framework: Framework): string {
  if (framework === 'nuxt') {
    return '.nuxt/tsconfig.json';
  }

  const possiblePaths = [
    'tsconfig.json',
    'tsconfig.app.json',
  ];

  for (const tsPath of possiblePaths) {
    if (existsSync(path.resolve(cwd, tsPath))) {
      return tsPath;
    }
  }

  return 'tsconfig.json';
}

async function readDependencyNames(cwd: string): Promise<Set<string>> {
  try {
    const packageJson = await readPackageJSON(cwd);
    return new Set([
      ...Object.keys(packageJson.dependencies ?? {}),
      ...Object.keys(packageJson.devDependencies ?? {}),
    ]);
  } catch {
    return new Set();
  }
}
