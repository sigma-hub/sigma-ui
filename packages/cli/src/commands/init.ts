import { existsSync, promises as fs } from 'node:fs';
import process from 'node:process';
import path from 'pathe';
import { Command } from 'commander';
import { template } from 'lodash-es';
import ora from 'ora';
import prompts from 'prompts';
import { consola } from 'consola';
import { colors } from 'consola/utils';
import { CONFIG_SCHEMA_URL } from '@sigma-ui/shared/schemas';
import { CONFIG_FILE_PATH, DEFAULT_COMPONENTS, DEFAULT_UTILS, TAILWIND_CSS_PATH } from '@sigma-ui/shared/consts';
import {
  TAILWIND_CSS_WITH_JS_CONFIG_TEMPLATE,
  TAILWIND_V4_CSS_TEMPLATE,
  UTILS_TEMPLATE,
} from '@sigma-ui/shared/templates/tailwind-config';
import { PREFLIGHT_CSS_TEMPLATE } from '@sigma-ui/shared/templates/preflight';
import {
  initOptionsSchema,
  rawConfigSchema,
  type ComponentNaming,
  type Config,
  type InitOptions,
  type RawConfig,
} from '@/src/schemas';
import { resolveConfigPaths } from '@/src/utils/get-config';
import { getProjectInfo, type ProjectInfo } from '@/src/utils/get-project-info';
import { handleError } from '@/src/utils/handle-error';
import {
  getNuxtCssEntry,
  importCssInViteEntry,
  registerNuxtCss,
  registerTailwindVitePlugin,
  registerTsconfigPaths,
  registerViteSourceAlias,
  type ConfigUpdateResult,
} from '@/src/utils/framework-config';
import { excludeInstalledDependencies } from '@/src/utils/install-plan';
import { getInstalledPackages, installPackages } from '@/src/utils/package-manager';
import { getBaseColors, getStyleSystems, getTheme } from '@/src/utils/themes';
import { applyPrefixesCss } from '@/src/utils/transformers/transform-tw-prefix';

const UTILS_DEPENDENCIES = ['clsx', 'tailwind-merge'];
const TAILWIND_DEPENDENCIES = ['tailwindcss-animate'];
const TAILWIND_DEV_DEPENDENCIES = ['tailwindcss', '@tailwindcss/vite'];

interface ConfigAnswers {
  styleSystem: RawConfig['styleSystem'];
  baseColor: string;
  componentNaming: ComponentNaming;
}

const DEFAULT_ANSWERS: ConfigAnswers = {
  styleSystem: 'tailwind',
  baseColor: 'grayscale',
  componentNaming: 'pascal-case',
};

export const init = new Command()
  .name('init')
  .description('initialize your project and install dependencies')
  .option('-y, --yes', 'skip confirmation prompts and overwrite existing files', false)
  .option('-d, --defaults', 'use the default configuration without prompts', false)
  .option('-c, --cwd <cwd>', 'the working directory. defaults to the current directory.', process.cwd())
  .action(async (opts) => {
    try {
      const options = initOptionsSchema.parse(opts);
      const cwd = path.resolve(options.cwd);

      if (!existsSync(cwd)) {
        throw new Error(`The path ${cwd} does not exist.`);
      }

      const projectInfo = await getProjectInfo(cwd);
      const config = await promptForConfig(cwd, projectInfo, options);

      await runInit(cwd, config, { ...options, projectInfo });

      consola.log('');
      consola.success('Project initialized. Add components with', colors.green('npx sigma-ui add button'));
    } catch (error) {
      handleError(error);
    }
  });

async function confirm(message: string, initial: boolean) {
  const { confirmed } = await prompts({ type: 'confirm', name: 'confirmed', message, initial });
  return Boolean(confirmed);
}

function canPrompt(options: Pick<InitOptions, 'yes'>) {
  return !options.yes && Boolean(process.stdout.isTTY);
}

export function getDefaultCssPath(cwd: string, framework: RawConfig['framework']) {
  if (framework === 'nuxt' && existsSync(path.join(cwd, 'app'))) {
    return `app/${TAILWIND_CSS_PATH.nuxt}`;
  }

  return TAILWIND_CSS_PATH[framework];
}

export function createConfig(cwd: string, projectInfo: ProjectInfo, answers: ConfigAnswers): RawConfig {
  const usesTailwind = answers.styleSystem === 'tailwind';

  return rawConfigSchema.parse({
    $schema: CONFIG_SCHEMA_URL,
    styleSystem: answers.styleSystem,
    framework: projectInfo.framework,
    tsConfigPath: projectInfo.tsConfigPath,
    setupTailwind: usesTailwind && !projectInfo.hasTailwind,
    cssPath: getDefaultCssPath(cwd, projectInfo.framework),
    baseColor: answers.baseColor,
    tailwind: {
      config: usesTailwind && projectInfo.tailwindConfigType === 'js' ? projectInfo.tailwindConfigPath ?? '' : '',
    },
    aliases: {
      components: DEFAULT_COMPONENTS,
      utils: usesTailwind ? DEFAULT_UTILS : '',
    },
    generatePreflight: !usesTailwind,
    componentNaming: answers.componentNaming,
  });
}

async function promptForConfig(cwd: string, projectInfo: ProjectInfo, options: InitOptions): Promise<RawConfig> {
  const highlight = (text: string) => colors.cyan(text);

  consola.info(`Detected a ${highlight(projectInfo.framework)} project.`);

  if (existsSync(path.join(cwd, CONFIG_FILE_PATH)) && canPrompt(options)) {
    if (!await confirm(`${CONFIG_FILE_PATH} already exists. Overwrite it?`, false)) {
      process.exit(0);
    }
  }

  if (options.defaults) {
    return createConfig(cwd, projectInfo, DEFAULT_ANSWERS);
  }

  const answers: ConfigAnswers = await prompts([
    {
      type: 'select',
      name: 'styleSystem',
      message: `Which ${highlight('style system')} would you like to use?`,
      choices: getStyleSystems().map(style => ({ title: style.label, value: style.name })),
    },
    {
      type: 'select',
      name: 'baseColor',
      message: `Choose a ${highlight('base color')} for your theme:`,
      choices: getBaseColors().map(color => ({ title: color.label, value: color.name })),
    },
    {
      type: 'select',
      name: 'componentNaming',
      message: `Choose the ${highlight('component file naming')} convention:`,
      choices: [
        { title: 'PascalCase (button/Button.vue)', value: 'pascal-case' },
        { title: 'kebab-case (button/button.vue)', value: 'kebab-case' },
      ],
    },
  ], { onCancel: () => process.exit(0) });

  const config = createConfig(cwd, projectInfo, answers);

  if (!options.yes) {
    consola.box(
      `Framework: ${highlight(config.framework)}\n`
      + `Style system: ${highlight(config.styleSystem)}\n`
      + `Base color: ${highlight(config.baseColor)}\n`
      + `File naming: ${highlight(config.componentNaming)}\n`
      + `CSS: ${highlight(config.cssPath)}\n`
      + `Components: ${highlight(config.aliases.components)}`,
    );

    if (!await confirm('Proceed?', true)) {
      process.exit(0);
    }
  }

  return config;
}

export async function runInit(
  cwd: string,
  rawConfig: RawConfig,
  options: Pick<InitOptions, 'yes'> & { projectInfo?: ProjectInfo } = { yes: true },
) {
  const projectInfo = options.projectInfo ?? await getProjectInfo(cwd);
  const spinner = ora('Writing files...').start();

  await fs.writeFile(path.join(cwd, CONFIG_FILE_PATH), `${JSON.stringify(rawConfig, null, 2)}\n`, 'utf8');
  const config = await resolveConfigPaths(cwd, rawConfig);

  spinner.stop();
  await writeProjectFiles(config, options);
  await updateFrameworkConfig(config);

  if (projectInfo.hasSigmaUiNuxtModule) {
    consola.info('Detected the sigma-ui-nuxt module.');
  }

  await installDependencies(config);
  return config;
}

async function writeFileIfAllowed(filePath: string, content: string, config: Config, options: Pick<InitOptions, 'yes'>) {
  if (existsSync(filePath)) {
    const currentContent = await fs.readFile(filePath, 'utf8');

    if (currentContent === content) {
      return;
    }

    const relativePath = path.relative(config.resolvedPaths.cwd, filePath);

    if (canPrompt(options) && !await confirm(`${relativePath} already exists. Overwrite it?`, false)) {
      consola.info(`Kept ${relativePath}.`);
      return;
    }
  }

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf8');
}

async function writeProjectFiles(config: Config, options: Pick<InitOptions, 'yes'>) {
  await fs.mkdir(config.resolvedPaths.components, { recursive: true });
  await writeFileIfAllowed(config.resolvedPaths.tailwindCss, getCssFileContent(config), config, options);

  if (config.resolvedPaths.utils) {
    const utilsPath = `${config.resolvedPaths.utils}.ts`;

    if (!existsSync(utilsPath)) {
      await fs.mkdir(path.dirname(utilsPath), { recursive: true });
      await fs.writeFile(utilsPath, UTILS_TEMPLATE, 'utf8');
    }
  }

  if (config.styleSystem === 'css' && config.generatePreflight) {
    const preflightPath = path.join(path.dirname(config.resolvedPaths.tailwindCss), 'preflight.css');
    await writeFileIfAllowed(preflightPath, PREFLIGHT_CSS_TEMPLATE, config, options);
  }
}

function generateCssVars(vars: Record<string, string>) {
  return Object.entries(vars)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n    ');
}

export function getCssFileContent(config: Config) {
  const theme = getTheme(config.baseColor);

  switch (config.styleSystem) {
    case 'tailwind': {
      const cssTemplate = config.tailwind.config ? TAILWIND_CSS_WITH_JS_CONFIG_TEMPLATE : TAILWIND_V4_CSS_TEMPLATE;
      const css = template(cssTemplate)({
        configPath: config.tailwind.config,
        cssVarsLight: generateCssVars(theme.cssVars.light),
        cssVarsDark: generateCssVars(theme.cssVars.dark),
      });

      return config.tailwind.prefix ? applyPrefixesCss(css, config.tailwind.prefix) : css;
    }

    case 'css':
      return config.generatePreflight
        ? `@import "./preflight.css";\n\n${theme.cssStylesWithVariables}`
        : theme.cssStylesWithVariables;

    default: {
      const unsupportedStyleSystem: never = config.styleSystem;
      throw new Error(`Unsupported style system "${unsupportedStyleSystem}".`);
    }
  }
}

function reportConfigUpdate(result: ConfigUpdateResult, cwd: string, manualStep: string) {
  switch (result.status) {
    case 'updated':
      consola.log(`  ${colors.yellow('~')} ${path.relative(cwd, result.file)}`);
      return;
    case 'unchanged':
      return;
    case 'not-found':
      consola.warn(`Could not find the file to update. ${manualStep}`);
      return;
    case 'failed':
      consola.warn(`Could not update ${path.relative(cwd, result.file)} (${result.reason}). ${manualStep}`);
      return;

    default: {
      const unknownResult: never = result;
      throw new Error(`Unknown config update result ${JSON.stringify(unknownResult)}.`);
    }
  }
}

async function updateFrameworkConfig(config: Config) {
  const { cwd } = config.resolvedPaths;

  if (config.styleSystem === 'tailwind' && config.setupTailwind) {
    reportConfigUpdate(
      await registerTailwindVitePlugin(cwd, config.framework),
      cwd,
      `Add ${colors.cyan('tailwindcss()')} from ${colors.cyan('@tailwindcss/vite')} to your Vite plugins.`,
    );
  }

  if (config.framework === 'nuxt') {
    const cssEntry = getNuxtCssEntry(cwd, config.cssPath);
    reportConfigUpdate(await registerNuxtCss(cwd, cssEntry), cwd, `Add ${colors.cyan(`'${cssEntry}'`)} to the css array in nuxt.config.`);
  }

  if (config.framework === 'vite') {
    reportConfigUpdate(await importCssInViteEntry(cwd, config.cssPath), cwd, `Import ${colors.cyan(config.cssPath)} in your app entry file.`);
    reportConfigUpdate(
      await registerViteSourceAlias(cwd),
      cwd,
      `Add an ${colors.cyan('@')} alias to ${colors.cyan('./src')} in your Vite config.`,
    );
    reportConfigUpdate(
      await registerTsconfigPaths(cwd),
      cwd,
      `Add ${colors.cyan('"@/*": ["./src/*"]')} to compilerOptions.paths.`,
    );
  }
}

async function installDependencies(config: Config) {
  const { cwd } = config.resolvedPaths;
  const installedPackages = getInstalledPackages(cwd);
  const usesTailwind = config.styleSystem === 'tailwind';

  const dependencies = excludeInstalledDependencies([
    ...(config.resolvedPaths.utils ? UTILS_DEPENDENCIES : []),
    ...(usesTailwind ? TAILWIND_DEPENDENCIES : []),
  ], installedPackages);
  const devDependencies = excludeInstalledDependencies(
    usesTailwind && config.setupTailwind ? TAILWIND_DEV_DEPENDENCIES : [],
    installedPackages,
  );

  if (!dependencies.length && !devDependencies.length) {
    return;
  }

  const spinner = ora('Installing dependencies...').start();

  try {
    await installPackages(dependencies, { cwd, silent: true });
    await installPackages(devDependencies, { cwd, dev: true, silent: true });
    spinner.succeed(`Installed ${[...dependencies, ...devDependencies].join(', ')}`);
  } catch (error) {
    spinner.fail('Failed to install dependencies.');
    consola.warn(`Install them manually: ${[...dependencies, ...devDependencies].join(' ')}`);
    consola.debug(error);
  }
}
