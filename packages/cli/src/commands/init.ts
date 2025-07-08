import { existsSync, promises as fs } from 'node:fs';
import process from 'node:process';
import path from 'pathe';
import { Command } from 'commander';
import { template } from 'lodash-es';
import ora from 'ora';
import prompts from 'prompts';
import { z } from 'zod';
import { addDependency, addDevDependency } from 'nypm';
import { consola } from 'consola';
import { colors } from 'consola/utils';
import prettier from 'prettier';
import { Project, SyntaxKind } from 'ts-morph';
import { getProjectInfo } from '../utils/get-project-info';
import {
  getRegistryBaseColor,
  getRegistryBaseColors,
  getRegistryStyles,
} from '../utils/registry';
import { handleError } from '../utils/handle-error';
import {
  getConfig,
  resolveConfigPaths,
} from '../utils/get-config';
import { DEFAULT_COMPONENTS, DEFAULT_UTILS, CONFIG_FILE_PATH, DEFAULT_TAILWIND_CONFIG, TAILWIND_CSS_PATH } from '~/packages/shared/consts';
import {
  rawConfigSchema,
  initOptionsSchema,
  type Config,
} from '../schemas';
import { transformCJSToESM } from '../utils/transformers/transform-cjs-to-esm';
import { applyPrefixesCss } from '../utils/transformers/transform-tw-prefix';
import { TAILWIND_CONFIG_TEMPLATE, UTILS_TEMPLATE } from '~/packages/shared/templates/tailwind-config';
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
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .action(async (opts) => {
    try {
      const spinner = ora('Fetching data...').start();
      const options = initOptionsSchema.parse(opts);
      const cwd = path.resolve(options.cwd);

      if (!existsSync(cwd)) {
        consola.error(`The path ${cwd} does not exist. Please try again.`);
        process.exit(1);
      }

      const existingConfig = await getConfig(cwd);
      spinner.stop();

      const config = await promptForConfig(cwd, existingConfig, options.yes);

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

export async function promptForConfig(
  cwd: string,
  defaultConfig: Config | null = null,
  skip = false,
) {
  const highlight = (text: string) => colors.cyan(text);

  const styles = await getRegistryStyles();
  const baseColors = await getRegistryBaseColors();
  const options = await prompts([
    {
      type: 'select',
      name: 'framework',
      message: `Which ${highlight('framework')} are you using?`,
      choices: [
        { title: 'Vite', value: 'vite' },
        { title: 'Nuxt', value: 'nuxt' },
        { title: 'Laravel', value: 'laravel' },
        { title: 'Astro', value: 'astro' },
      ],
    },
    {
      type: 'select',
      name: 'styleSystem',
      message: `Which ${highlight('style system')} are you using?`,
      choices: styles.map(style => ({
        title: style.label,
        value: style.name,
      })),
    },
    {
      type: (_, answers) => answers.styleSystem === 'tailwind' ? 'toggle' : null,
      name: 'setupTailwind',
      message: `Setup ${highlight('Tailwind')} in this project for you?`,
      initial: !defaultConfig?.tailwind.config,
      active: 'yes',
      inactive: 'no',
    },
    {
      type: 'select',
      name: 'tailwindBaseColor',
      message: `Choose primary ${highlight('base color')}:`,
      choices: baseColors.map(color => ({
        title: color.label,
        value: color.name,
      })),
    },
    {
      type: (_, answers) => answers.styleSystem === 'tailwind' ? 'text' : null,
      name: 'tailwindConfig',
      message: `Specify the path to ${highlight('tailwind')} config file ${colors.gray('(it will be overwritten / created)')}`,
      initial: (_, answers) => {
        if (defaultConfig?.tailwind.config) {
          return defaultConfig?.tailwind.config;
        }

        if (answers.framework === 'astro') {
          return 'tailwind.config.mjs';
        } else {
          return DEFAULT_TAILWIND_CONFIG;
        }
      },
    },
    {
      type: 'text',
      name: 'tsConfigPath',
      message: `Specify the path to ${highlight('tsconfig')} file`,
      initial: (_, values) => {
        const prefix = values.framework === 'nuxt' ? '.nuxt/' : './';
        return `${prefix}tsconfig.json`;
      },
    },
    {
      type: 'text',
      name: 'cssPath',
      message: `Specify the path to ${highlight('global CSS')} file ${colors.gray('(it will be overwritten / created)')}`,
      initial: (_, values) => defaultConfig?.cssPath ?? TAILWIND_CSS_PATH[values.framework as 'vite' | 'nuxt' | 'laravel' | 'astro'],
    },
    {
      type: 'text',
      name: 'components',
      message: `Configure the import alias for ${highlight('components')}:`,
      initial: defaultConfig?.aliases.components ?? DEFAULT_COMPONENTS,
    },
    {
      type: (_, answers) => answers.styleSystem === 'tailwind' ? 'text' : null,
      name: 'utils',
      message: `Configure the import alias for ${highlight('utils')}:`,
      initial: defaultConfig?.aliases.utils ?? DEFAULT_UTILS,
    },
    {
      type: (_, answers) => answers.styleSystem === 'css' ? 'toggle' : null,
      name: 'generatePreflight',
      message: `Generate ${highlight('preflight.css')} with modern CSS reset? ${colors.gray('(recommended)')}`,
      initial: true,
      active: 'yes',
      inactive: 'no',
    },
  ]);

  if (!skip) {
    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message: `Configuration is done. The config file will be created (${highlight(CONFIG_FILE_PATH)}) and the required dependencies will be installed. Make sure to handle any unstaged Git changes before proceeding. Finish setup?`,
      initial: true,
    });

    if (!proceed) {
      process.exit(0);
    }
  }

  const config = createConfig(options);
  await writeConfigFile(cwd, config);

  return await resolveConfigPaths(cwd, config);
}

function createConfig(options: Awaited<ReturnType<typeof prompts>>): Config {
  const config = rawConfigSchema.parse({
    $schema: 'https://sigma-ui.dev/schema.json',
    styleSystem: options.styleSystem,
    tsConfigPath: options.tsConfigPath,
    setupTailwind: options.setupTailwind,
    framework: options.framework,
    cssPath: options.cssPath,
    baseColor: options.tailwindBaseColor,
    tailwind: {
      config: options.tailwindConfig || '',
    },
    aliases: {
      utils: options.utils || '',
      components: options.components,
    },
    generatePreflight: options.generatePreflight,
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

async function handleNuxtProject() {
  const { isNuxt, sigmaUiNuxtModuleInfo } = await getProjectInfo();

  if (isNuxt) {
    consola.log('');
    sigmaUiNuxtModuleInfo
      ? consola.info(`Detected a Nuxt project with 'sigma-ui-nuxt' v${sigmaUiNuxtModuleInfo.version}`)
      : consola.warn(`Detected a Nuxt project without 'sigma-ui-nuxt' module. It's recommended to install it.`);
  }
}

export async function runInit(cwd: string, config: Config) {
  await writeFiles(config);
  await installDependencies(config, cwd);
}

async function writeFiles(config: Config) {
  const writeFilesSpinner = ora('Initializing project')?.start();
  await handleNuxtProject();
  await ensureDirectoriesExist(config);

  if (config.tailwind.config) {
    writeTailwindConfig(config);

    if (config.framework === 'vite' && config.setupTailwind) {
      await updateViteConfig();
    }
  }

  writeCssFile(config);
  writeCnFile(config);
  await writePreflightCss(config);

  writeFilesSpinner?.succeed();
}

async function writeTailwindConfig(config: Config) {
  const unformattedConfig = template(TAILWIND_CONFIG_TEMPLATE)({
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

async function writeCssFile(config: Config) {
  const baseColorData = await getRegistryBaseColor(config.baseColor);

  if (baseColorData) {
    const file = config.resolvedPaths.tailwindCss;
    let data = '';

    if (config.styleSystem === 'tailwind') {
      data = config.tailwind.prefix
        ? applyPrefixesCss(baseColorData.templates.tailwind.withVariables, config.tailwind.prefix)
        : baseColorData.templates.tailwind.withVariables;
    } else if (config.styleSystem === 'css') {
      data = baseColorData.templates.css.withVariables;

      if (config.generatePreflight) {
        data = `@import "./preflight.css";\n\n${data}`;
      }
    }

    await fs.writeFile(file, data, 'utf8');
  }
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
  const { sigmaUiNuxtModuleInfo } = await getProjectInfo();
  const dependenciesSpinner = ora('Installing dependencies')?.start();

  let baseDeps: string[] = [];
  let baseDevDeps: string[] = [];

  if (sigmaUiNuxtModuleInfo?.version) {
    // Base dependencies are handled by the Nuxt module
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

  await Promise.allSettled(
    [
      config.framework === 'nuxt' && await addDevDependency(PROJECT_DEPENDENCIES.nuxt, {
        cwd,
        silent: true,
      }),
      await addDependency(deps, {
        cwd,
        silent: true,
      }),
      devDeps.length > 0 && await addDevDependency(devDeps, {
        cwd,
        silent: true,
      }),
    ],
  );

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
