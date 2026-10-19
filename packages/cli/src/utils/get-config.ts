import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import process from 'node:process';
import path from 'pathe';
import { loadConfig as loadTsConfig, type ConfigLoaderSuccessResult } from 'tsconfig-paths';
import consola from 'consola';
import { colors } from 'consola/utils';
import { INIT_COMMAND, CONFIG_FILE_PATH } from '@sigma-ui/shared/consts';
import { resolveImport } from '@/src/utils/resolve-import';
import {
  configSchema,
  rawConfigSchema,
  type Config,
  type RawConfig,
} from '@/src/schemas';

const SOURCE_ALIAS_PATTERN = /^(@|~)\//;

export async function getConfig(cwd: string) {
  const config = await getRawConfig(cwd);

  if (!config) {
    return null;
  }

  return await resolveConfigPaths(cwd, config);
}

export async function getConfigOrExit(cwd: string): Promise<Config> {
  const config = await getConfig(cwd);

  if (!config) {
    handleConfigIsMissing();
  }

  return config!;
}

export function handleConfigIsMissing(): never {
  consola.warn(`Configuration is missing. Run ${colors.green(INIT_COMMAND)} command to create config file`);
  process.exit(1);
}

export function getDerivedAliases(config: Pick<RawConfig, 'aliases'>) {
  const componentsRoot = path.dirname(config.aliases.components);
  const sourceRoot = path.dirname(componentsRoot);

  return {
    blocks: config.aliases.blocks ?? `${componentsRoot}/blocks`,
    lib: config.aliases.lib ?? (config.aliases.utils ? path.dirname(config.aliases.utils) : `${sourceRoot}/lib`),
    composables: config.aliases.composables ?? `${sourceRoot}/composables`,
  };
}

function getSourceDirectory(cwd: string, config: RawConfig) {
  if (config.framework === 'nuxt') {
    return existsSync(path.resolve(cwd, 'app')) ? path.resolve(cwd, 'app') : cwd;
  }

  return existsSync(path.resolve(cwd, 'src')) ? path.resolve(cwd, 'src') : cwd;
}

function loadProjectTsConfig(cwd: string, config: RawConfig): ConfigLoaderSuccessResult | null {
  const candidates = [config.tsConfigPath, 'tsconfig.app.json', 'tsconfig.json', 'jsconfig.json'];

  for (const candidate of candidates) {
    const tsConfigPath = path.resolve(cwd, candidate);

    if (!existsSync(tsConfigPath)) {
      continue;
    }

    const tsConfig = loadTsConfig(tsConfigPath);

    if (tsConfig.resultType === 'success' && Object.keys(tsConfig.paths).length > 0) {
      return tsConfig;
    }
  }

  return null;
}

export function createAliasResolver(cwd: string, config: RawConfig) {
  const tsConfig = loadProjectTsConfig(cwd, config);
  const sourceDirectory = getSourceDirectory(cwd, config);

  return (alias: string) => {
    const resolvedFromTsConfig = tsConfig ? resolveImport(alias, tsConfig) : undefined;

    if (resolvedFromTsConfig) {
      return resolvedFromTsConfig;
    }

    if (SOURCE_ALIAS_PATTERN.test(alias)) {
      return path.resolve(sourceDirectory, alias.replace(SOURCE_ALIAS_PATTERN, ''));
    }

    return path.resolve(cwd, alias);
  };
}

export async function resolveConfigPaths(cwd: string, config: RawConfig): Promise<Config> {
  const resolveAlias = createAliasResolver(cwd, config);
  const derivedAliases = getDerivedAliases(config);

  return configSchema.parse({
    ...config,
    resolvedPaths: {
      cwd,
      tailwindConfig: config.tailwind.config ? path.resolve(cwd, config.tailwind.config) : '',
      tailwindCss: path.resolve(cwd, config.cssPath),
      utils: config.aliases.utils ? resolveAlias(config.aliases.utils) : '',
      components: resolveAlias(config.aliases.components),
      blocks: resolveAlias(derivedAliases.blocks),
      lib: resolveAlias(derivedAliases.lib),
      composables: resolveAlias(derivedAliases.composables),
    },
  });
}

export async function readRawConfigFile(cwd: string): Promise<Record<string, unknown> | null> {
  const configPath = path.join(cwd, CONFIG_FILE_PATH);

  if (!existsSync(configPath)) {
    return null;
  }

  try {
    return JSON.parse(await readFile(configPath, 'utf8'));
  } catch (error) {
    throw new Error(`Could not parse ${configPath}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  const rawConfig = await readRawConfigFile(cwd);

  if (!rawConfig) {
    return null;
  }

  const result = rawConfigSchema.safeParse(rawConfig);

  if (!result.success) {
    const issues = result.error.issues.map(issue => `${issue.path.join('.') || 'config'}: ${issue.message}`).join('\n  ');
    throw new Error(`Invalid configuration in ${path.join(cwd, CONFIG_FILE_PATH)}:\n  ${issues}\nRun ${colors.green('npx sigma-ui migrate')} to upgrade a 1.x config.`);
  }

  return result.data;
}
