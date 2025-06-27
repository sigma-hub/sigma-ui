import { existsSync } from 'node:fs';
import path from 'pathe';
import fs from 'fs-extra';
import { readPackageJSON } from 'pkg-types';
import type { PackageJson } from 'pkg-types';

export async function getProjectInfo() {
  const info = {
    tsconfig: null,
    isNuxt: false,
    sigmaUiNuxtModuleInfo: undefined,
    isVueVite: false,
    srcDir: false,
    componentsUiDir: false,
    srcComponentsUiDir: false,
  };

  try {
    const tsconfig = await getTsConfig();

    const isNuxt = existsSync(path.resolve('./nuxt.config.js')) || existsSync(path.resolve('./nuxt.config.ts'));
    const sigmaUiNuxtModuleInfo = isNuxt ? await getSigmaUiNuxtInfo() : undefined;

    return {
      tsconfig,
      isNuxt,
      sigmaUiNuxtModuleInfo,
      isVueVite: existsSync(path.resolve('./vite.config.js')) || existsSync(path.resolve('./vite.config.ts')),
      srcDir: existsSync(path.resolve('./src')),
      srcComponentsUiDir: existsSync(path.resolve('./src/components/ui')),
      componentsUiDir: existsSync(path.resolve('./components/ui')),
    };
  } catch (error) {
    console.log(error);
    return info;
  }
}

async function getSigmaUiNuxtInfo() {
  let nuxtModule: PackageJson | undefined;

  try {
    nuxtModule = await readPackageJSON('sigma-ui-nuxt');
  } catch (error) {
    console.log(error);
    nuxtModule = undefined;
  }

  return nuxtModule;
}

export async function getTsConfig() {
  try {
    const tsconfigPath = path.join('tsconfig.json');
    const tsconfig = await fs.readJSON(tsconfigPath);

    if (!tsconfig) {
      throw new Error('tsconfig.json is missing');
    }

    return tsconfig;
  } catch (error) {
    console.log(error);
    return null;
  }
}
