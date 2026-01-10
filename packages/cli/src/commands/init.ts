import { existsSync, promises as fs } from 'node:fs';
import process from 'node:process';
import path from 'pathe';
import { Command } from 'commander';
import { template } from 'lodash-es';
import ora from 'ora';
import prompts from 'prompts';
import { z } from 'zod';
import { addDependency, addDevDependency } from '../utils/package-manager';
import { consola } from 'consola';
import { colors } from 'consola/utils';
import prettier from 'prettier';
import { Project, SyntaxKind } from 'ts-morph';
import { getProjectInfo, type Framework, type TailwindConfigType } from '../utils/get-project-info';
import {
  getRegistryBaseColor,
  getRegistryBaseColors,
  getRegistryStyles,
} from '../utils/registry';
import { handleError } from '../utils/handle-error';
import {
  resolveConfigPaths,
} from '../utils/get-config';
import { DEFAULT_COMPONENTS, DEFAULT_UTILS, CONFIG_FILE_PATH, DEFAULT_TAILWIND_CONFIG, TAILWIND_CSS_PATH } from '~/packages/shared/consts';
import {
  rawConfigSchema,
  initOptionsSchema,
  type Config,
  type ComponentNaming,
} from '../schemas';
import { transformCJSToESM } from '../utils/transformers/transform-cjs-to-esm';
import { applyPrefixesCss } from '../utils/transformers/transform-tw-prefix';
import {
  TAILWIND_CONFIG_JS_TEMPLATE,
  TAILWIND_V4_CSS_TEMPLATE,
  TAILWIND_CSS_WITH_JS_CONFIG_TEMPLATE,
  UTILS_TEMPLATE,
} from '~/packages/shared/templates/tailwind-config';
import { PREFLIGHT_CSS_TEMPLATE } from '~/packages/shared/templates/preflight';

const PROJECT_DEPENDENCIES = {
  sharedBase: [
    'lucide-vue-next',
  ],
  styleSystemBase: {
    tailwind: [
      'tailwindcss-animate',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
      'reka-ui',
    ],
    css: [
      'class-variance-authority',
      'reka-ui',
    ],
  },
  nuxt: [
    '@nuxtjs/tailwindcss',
  ],
};

const PROJECT_DEV_DEPENDENCIES = {
  styleSystemBase: {
    tailwind: [
      'tailwindcss',
      '@tailwindcss/vite',
    ],
  },
};

export const init = new Command()
  .name('init')
  .description('initialize your project and install dependencies')
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option('-d, --defaults', 'use default configuration without prompts.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .action(async (opts) => {
    try {
      const options = initOptionsSchema.parse(opts);
      const cwd = path.resolve(options.cwd);

      if (!existsSync(cwd)) {
        consola.error(`The path ${cwd} does not exist. Please try again.`);
        process.exit(1);
      }

      const config = await promptForConfig(cwd, options.yes, options.defaults);

      await runInit(cwd, config);

      consola.log('');
      consola.info(
        `${colors.green('Success!')} Project initialization completed.`,
      );
      consola.log('');
    } catch (error) {
      handleError(error);
    }
  });

interface DetectedConfig {
  framework: Framework;
  tsConfigPath: string;
  cssPath: string;
  tailwindConfigPath: string;
  tailwindConfigType: TailwindConfigType;
  setupTailwind: boolean;
}

function getDetectedConfig(projectInfo: Awaited<ReturnType<typeof getProjectInfo>>): DetectedConfig {
  const { framework, tsConfigPath, hasTailwind, tailwindConfigType, tailwindConfigPath } = projectInfo;

  return {
    framework,
    tsConfigPath,
    cssPath: TAILWIND_CSS_PATH[framework],
    tailwindConfigPath: tailwindConfigPath ?? (framework === 'astro' ? 'tailwind.config.mjs' : DEFAULT_TAILWIND_CONFIG),
    tailwindConfigType: tailwindConfigType,
    setupTailwind: !hasTailwind,
  };
}

export async function promptForConfig(
  cwd: string,
  skipConfirmation = false,
  useDefaults = false,
) {
  const highlight = (text: string) => colors.cyan(text);

  const spinner = ora('Detecting project settings...').start();
  const projectInfo = await getProjectInfo(cwd);
  const detectedConfig = getDetectedConfig(projectInfo);
  const styles = await getRegistryStyles();
  const baseColors = await getRegistryBaseColors();
  spinner.stop();

  consola.info(`Detected ${highlight(detectedConfig.framework)} project`);

  if (useDefaults) {
    const config = createConfig({
      framework: detectedConfig.framework,
      styleSystem: 'tailwind',
      tailwindBaseColor: 'grayscale',
      componentNaming: 'pascal-case',
      tsConfigPath: detectedConfig.tsConfigPath,
      cssPath: detectedConfig.cssPath,
      tailwindConfigPath: detectedConfig.tailwindConfigPath,
      tailwindConfigType: detectedConfig.tailwindConfigType,
      setupTailwind: detectedConfig.setupTailwind,
      components: DEFAULT_COMPONENTS,
      utils: DEFAULT_UTILS,
      generatePreflight: true,
    });

    await writeConfigFile(cwd, config);
    return await resolveConfigPaths(cwd, config);
  }

  const options = await prompts([
    {
      type: 'select',
      name: 'styleSystem',
      message: `Which ${highlight('style system')} would you like to use?`,
      choices: styles.map(style => ({
        title: style.label,
        value: style.name,
      })),
    },
    {
      type: 'select',
      name: 'tailwindBaseColor',
      message: `Choose a ${highlight('base color')} for your theme:`,
      choices: baseColors.map(color => ({
        title: color.label,
        value: color.name,
      })),
    },
    {
      type: 'select',
      name: 'componentNaming',
      message: `Choose ${highlight('component naming')} convention:`,
      choices: [
        { title: 'PascalCase (Button.vue)', value: 'pascal-case' },
        { title: 'kebab-case (button.vue)', value: 'kebab-case' },
      ],
      initial: 0,
    },
  ]);

  if (!skipConfirmation) {
    consola.log('');
    consola.box(
      `Framework: ${highlight(detectedConfig.framework)}\n`
      + `Style: ${highlight(options.styleSystem)}\n`
      + `Theme: ${highlight(options.tailwindBaseColor)}\n`
      + `Naming: ${highlight(options.componentNaming)}\n`
      + `CSS: ${highlight(detectedConfig.cssPath)}\n`
      + `Components: ${highlight(DEFAULT_COMPONENTS)}`,
    );

    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message: 'Proceed with installation?',
      initial: true,
    });

    if (!proceed) {
      process.exit(0);
    }
  }

  const config = createConfig({
    ...options,
    framework: detectedConfig.framework,
    tsConfigPath: detectedConfig.tsConfigPath,
    cssPath: detectedConfig.cssPath,
    tailwindConfigPath: options.styleSystem === 'tailwind' ? detectedConfig.tailwindConfigPath : '',
    tailwindConfigType: detectedConfig.tailwindConfigType,
    setupTailwind: options.styleSystem === 'tailwind' ? detectedConfig.setupTailwind : false,
    components: DEFAULT_COMPONENTS,
    utils: DEFAULT_UTILS,
    generatePreflight: options.styleSystem === 'css',
  });

  await writeConfigFile(cwd, config);
  return await resolveConfigPaths(cwd, config);
}

interface ConfigOptions {
  framework: Framework;
  styleSystem: string;
  tailwindBaseColor: string;
  componentNaming: ComponentNaming;
  tsConfigPath: string;
  cssPath: string;
  tailwindConfigPath: string;
  tailwindConfigType: TailwindConfigType;
  setupTailwind: boolean;
  components: string;
  utils: string;
  generatePreflight: boolean;
}

function createConfig(options: ConfigOptions): Config {
  const usesJsConfig = options.tailwindConfigType === 'js';

  const config = rawConfigSchema.parse({
    $schema: 'https://sigma-ui.dev/schema.json',
    styleSystem: options.styleSystem,
    tsConfigPath: options.tsConfigPath,
    setupTailwind: options.setupTailwind,
    framework: options.framework,
    cssPath: options.cssPath,
    baseColor: options.tailwindBaseColor,
    tailwind: {
      config: usesJsConfig ? options.tailwindConfigPath : '',
    },
    aliases: {
      utils: options.utils || '',
      components: options.components,
    },
    generatePreflight: options.generatePreflight,
    componentNaming: options.componentNaming || 'pascal-case',
  } satisfies z.infer<typeof rawConfigSchema>);

  return config as Config;
}

async function writeConfigFile(cwd: string, config: Config) {
  consola.log('');
  const spinner = ora(`Writing config file ${CONFIG_FILE_PATH}`).start();
  const targetPath = path.resolve(cwd, CONFIG_FILE_PATH);
  await fs.writeFile(targetPath, JSON.stringify(config, null, 2), 'utf8');
  spinner.succeed();
}

async function handleNuxtProject(cwd: string) {
  const projectInfo = await getProjectInfo(cwd);

  if (projectInfo.framework === 'nuxt') {
    consola.log('');

    if (projectInfo.sigmaUiNuxtModuleInfo) {
      consola.info(`Detected a Nuxt project with 'sigma-ui-nuxt' v${projectInfo.sigmaUiNuxtModuleInfo.version}`);
    } else {
      consola.warn(`Detected a Nuxt project without 'sigma-ui-nuxt' module. It's recommended to install it.`);
    }
  }
}

export async function runInit(cwd: string, config: Config) {
  await writeFiles(config, cwd);
  await installDependencies(config, cwd);
}

async function writeFiles(config: Config, cwd: string) {
  const writeFilesSpinner = ora('Initializing project')?.start();
  await handleNuxtProject(cwd);
  await ensureDirectoriesExist(config);

  const hasJsConfig = Boolean(config.tailwind.config && config.tailwind.config.length > 0);

  if (hasJsConfig) {
    await writeTailwindJsConfig(config);
  }

  if (config.framework === 'vite' && config.setupTailwind) {
    await updateViteConfig();
  }

  await writeCssFile(config, hasJsConfig);
  writeCnFile(config);
  await writePreflightCss(config);

  writeFilesSpinner?.succeed();
}

async function writeTailwindJsConfig(config: Config) {
  const unformattedConfig = template(TAILWIND_CONFIG_JS_TEMPLATE)({
    framework: config.framework,
    prefix: config.tailwind.prefix,
    extension: 'ts',
  });

  const esmConfig = transformCJSToESM(
    config.resolvedPaths.tailwindConfig,
    unformattedConfig,
  );

  const formattedConfig = await prettier.format(esmConfig, {
    parser: 'typescript',
    semi: false,
    singleQuote: true,
    trailingComma: 'es5',
  });

  await fs.writeFile(
    config.resolvedPaths.tailwindConfig,
    formattedConfig,
    'utf8',
  );
}

async function writeCssFile(config: Config, hasJsConfig: boolean) {
  const baseColorData = await getRegistryBaseColor(config.baseColor);

  if (!baseColorData) {
    return;
  }

  const file = config.resolvedPaths.tailwindCss;
  let data = '';

  if (config.styleSystem === 'tailwind') {
    const cssVarsLight = generateCssVars(baseColorData.cssVars.light);
    const cssVarsDark = generateCssVars(baseColorData.cssVars.dark);

    if (hasJsConfig) {
      data = template(TAILWIND_CSS_WITH_JS_CONFIG_TEMPLATE)({
        configPath: config.tailwind.config,
        cssVarsLight,
        cssVarsDark,
      });
    } else {
      data = template(TAILWIND_V4_CSS_TEMPLATE)({
        cssVarsLight,
        cssVarsDark,
      });
    }

    if (config.tailwind.prefix) {
      data = applyPrefixesCss(data, config.tailwind.prefix);
    }
  } else if (config.styleSystem === 'css') {
    data = baseColorData.templates.css.withVariables;

    if (config.generatePreflight) {
      data = `@import "./preflight.css";\n\n${data}`;
    }
  }

  const formattedCss = await prettier.format(data, {
    parser: 'css',
    singleQuote: true,
  });

  await fs.writeFile(file, formattedCss, 'utf8');
}

function generateCssVars(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n    ');
}

async function writeCnFile(config: Config) {
  if (config.resolvedPaths.utils) {
    await fs.writeFile(
      `${config.resolvedPaths.utils}.ts`,
      UTILS_TEMPLATE,
      'utf8',
    );
  }
}

async function writePreflightCss(config: Config) {
  if (config.styleSystem === 'css' && config.generatePreflight) {
    const preflightPath = path.join(path.dirname(config.resolvedPaths.tailwindCss), 'preflight.css');
    const formattedPreflight = await prettier.format(PREFLIGHT_CSS_TEMPLATE, {
      parser: 'css',
      singleQuote: true,
    });
    await fs.writeFile(preflightPath, formattedPreflight, 'utf8');
  }
}

async function installDependencies(config: Config, cwd: string) {
  const projectInfo = await getProjectInfo(cwd);
  const dependenciesSpinner = ora('Installing dependencies')?.start();

  let baseDeps: string[] = [];
  let baseDevDeps: string[] = [];

  if (projectInfo.sigmaUiNuxtModuleInfo?.version) {
    baseDeps = [];
  } else {
    if (config.styleSystem === 'css') {
      baseDeps = PROJECT_DEPENDENCIES.styleSystemBase.css;
    } else if (config.styleSystem === 'tailwind') {
      baseDeps = PROJECT_DEPENDENCIES.styleSystemBase.tailwind;

      if (config.setupTailwind) {
        baseDevDeps = PROJECT_DEV_DEPENDENCIES.styleSystemBase.tailwind;
      }
    }
  }

  const deps = [...baseDeps, ...PROJECT_DEPENDENCIES.sharedBase].filter(Boolean);
  const devDeps = baseDevDeps.filter(Boolean);

  const installTasks = [
    config.framework === 'nuxt' && PROJECT_DEPENDENCIES.nuxt.length && { type: 'devDependencies', deps: PROJECT_DEPENDENCIES.nuxt, installer: addDevDependency },
    deps.length && { type: 'dependencies', deps, installer: addDependency },
    devDeps.length && { type: 'devDependencies', deps: devDeps, installer: addDevDependency },
  ].filter(Boolean) as { type: 'dependencies' | 'devDependencies'; deps: string[]; installer: typeof addDependency | typeof addDevDependency }[];

  for (const task of installTasks) {
    try {
      dependenciesSpinner.text = `Installing ${task.type}...`;
      await task.installer(task.deps, { cwd, silent: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      consola.error(`Failed to install ${task.type}: ${errorMessage}`);
      // Don't throw here to allow other tasks to continue
    }
  }

  dependenciesSpinner?.succeed();
}

async function ensureDirectoriesExist(config: Config) {
  for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
    const directoryPath = await getDirectoryPath(key, resolvedPath);

    if (directoryPath) {
      await fs.mkdir(directoryPath, { recursive: true });
    }
  }
}

async function getDirectoryPath(key: string, resolvedPath: string): Promise<string> {
  let directoryPath = resolvedPath;

  try {
    const stats = await fs.stat(resolvedPath);

    if (stats.isFile()) {
      directoryPath = path.dirname(resolvedPath);
    }
  } catch {
    // During initialization, files not existing is expected
    // Just get the directory path without logging an error
    if (path.extname(resolvedPath) !== '') {
      directoryPath = path.dirname(resolvedPath);
    }
  }

  if (key === 'utils' && directoryPath?.endsWith('/utils')) {
    directoryPath = directoryPath.replace(/\/utils$/, '');
  }

  return directoryPath;
}

async function updateViteConfig() {
  const viteConfigPath = path.join(process.cwd(), 'vite.config.ts');

  if (!existsSync(viteConfigPath)) {
    consola.warn(`Vite config file not found at ${viteConfigPath}`);
    return;
  }

  const viteConfig = await fs.readFile(viteConfigPath, 'utf8');
  const needsTailwindConfig = !viteConfig.includes('@tailwindcss/vite');

  if (!needsTailwindConfig) {
    return;
  }

  const project = new Project({
    compilerOptions: {},
  });

  const sourceFile = project.addSourceFileAtPath(viteConfigPath);
  const exportAssignment = sourceFile.getExportAssignment(node => node.isExportEquals() === false);

  if (!exportAssignment) {
    consola.warn('Could not find default export in Vite config');
    return;
  }

  const configObject = exportAssignment.getExpression();

  if (!configObject.asKind(SyntaxKind.CallExpression)) {
    consola.warn('Default export is not a defineConfig call');
    return;
  }

  const defineConfigCall = configObject.asKindOrThrow(SyntaxKind.CallExpression);
  const configArg = defineConfigCall.getArguments()[0];

  if (!configArg?.asKind(SyntaxKind.ObjectLiteralExpression)) {
    consola.warn('defineConfig argument is not an object literal');
    return;
  }

  const configObjLiteral = configArg.asKindOrThrow(SyntaxKind.ObjectLiteralExpression);

  sourceFile.addImportDeclaration({
    moduleSpecifier: '@tailwindcss/vite',
    defaultImport: 'tailwindcss',
  });

  let pluginsProp = configObjLiteral.getProperty('plugins');

  if (!pluginsProp) {
    configObjLiteral.addPropertyAssignment({
      name: 'plugins',
      initializer: '[]',
    });
    pluginsProp = configObjLiteral.getProperty('plugins');
  }

  if (!pluginsProp) {
    consola.warn('Could not create plugins property');
    return;
  }

  const pluginsArray = pluginsProp.getFirstChildByKind(SyntaxKind.ArrayLiteralExpression);

  if (!pluginsArray) {
    consola.warn('Could not find or create plugins array');
    return;
  }

  const hasTailwindPlugin = pluginsArray.getElements().some((element) => {
    if (element.getKind() !== SyntaxKind.CallExpression) {
      return false;
    }

    const callExpr = element.asKindOrThrow(SyntaxKind.CallExpression);
    const expression = callExpr.getExpression();
    return expression.getText() === 'tailwindcss';
  });

  if (!hasTailwindPlugin) {
    pluginsArray.addElement('tailwindcss()');
  }

  const formattedCode = await prettier.format(sourceFile.getFullText(), {
    parser: 'typescript',
    semi: false,
    singleQuote: true,
    trailingComma: 'es5',
  });

  await fs.writeFile(viteConfigPath, formattedCode, 'utf8');
}
