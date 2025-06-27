import { existsSync } from 'node:fs';
import process from 'node:process';
import path from 'pathe';
import { loadConfig as c12LoadConfig } from 'c12';
import type { ConfigLoaderResult } from 'tsconfig-paths';
import { loadConfig } from 'tsconfig-paths';
import consola from 'consola';
import { colors } from 'consola/utils';
import { resolveImport } from '@/src/utils/resolve-import';
import {
  configSchema,
  rawConfigSchema,
  type RawConfig,
} from '@/src/schemas';
import { INIT_COMMAND, CONFIG_FILE_PATH } from '~/packages/shared/consts';

export async function getConfig(cwd: string) {
  const config = await getRawConfig(cwd);

  if (!config) {
    return null;
  }

  return await resolveConfigPaths(cwd, config);
}

export async function handleConfigIsMissing() {
  consola.warn(`Configuration is missing. Run ${colors.green(INIT_COMMAND)} command to create config file`);
  process.exit(1);
}

export async function resolveConfigPaths(cwd: string, config: RawConfig) {
  let tsConfig: ConfigLoaderResult | undefined;
  let tsConfigPath = path.resolve(
    cwd,
    config.tsConfigPath,
  );

  tsConfig = loadConfig(tsConfigPath);

  // If no paths were found, try to load tsconfig.app.json.
  if ('paths' in tsConfig && Object.keys(tsConfig.paths).length === 0) {
    tsConfigPath = path.resolve(cwd, './tsconfig.app.json');

    if (existsSync(tsConfigPath)) {
      tsConfig = loadConfig(tsConfigPath);
    }
  }

  if (tsConfig.resultType === 'failed') {
    throw new Error(
      `Failed to load ${tsConfigPath}. ${tsConfig.message ?? ''}`.trim(),
    );
  }

  return configSchema.parse({
    ...config,
    resolvedPaths: {
      tailwindConfig: path.resolve(cwd, config.tailwind.config),
      tailwindCss: path.resolve(cwd, config.cssPath),
      utils: resolveImport(config.aliases.utils, tsConfig),
      components: resolveImport(config.aliases.components, tsConfig),
    },
  });
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
    const configResult = await c12LoadConfig({
      name: 'components',
      configFile: CONFIG_FILE_PATH,
      cwd,
    });

    if (!configResult.config || Object.keys(configResult.config).length === 0) {
      return null;
    }

    return rawConfigSchema.parse(configResult.config);
  } catch (error) {
    throw new Error(`Invalid configuration found in ${cwd}/${CONFIG_FILE_PATH}. ${error}`);
  }
}
