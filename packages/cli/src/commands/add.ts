import { existsSync, promises as fs } from 'node:fs';
import process from 'node:process';
import path from 'pathe';
import { consola } from 'consola';
import { colors } from 'consola/utils';
import { Command } from 'commander';
import ora from 'ora';
import prompts from 'prompts';
import { z } from 'zod';
import { addDependency, addDevDependency } from '../utils/package-manager';
import { transform } from '@/src/utils/transformers';
import { getConfig, handleConfigIsMissing } from '@/src/utils/get-config';
import { handleError } from '@/src/utils/handle-error';
import {
  fetchTree,
  getItemTargetPath,
  getRegistryBaseColor,
  getRegistryIndex,
  resolveTree,
} from '@/src/utils/registry';
import {
  type registryBaseColorSchema,
  type Config,
  addOptionsSchema,
  configValidationSchema,
} from '@/src/schemas';

type AddOptions = z.infer<typeof addOptionsSchema>;

class ComponentInstallError extends Error {
  constructor(message: string, public component?: string) {
    super(message);
    this.name = 'ComponentInstallError';
  }
}

export const add = new Command()
  .name('add')
  .description('add a component to your project')
  .argument('[components...]', 'the components to add')
  .option('-y, --yes', 'skip confirmation prompt.', true)
  .option('-o, --overwrite', 'overwrite existing files.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .option('-a, --all', 'add all available components', false)
  .option('-p, --path <path>', 'the path to add the component to.')
  .action(async (components, opts) => {
    try {
      const spinner = ora('Fetching components...').start();
      const options = parseOptions(components, opts);
      const cwd = validateAndResolveCwd(options.cwd);
      const config = await getConfigOrExit(cwd);

      try {
        configValidationSchema.parse(config);
      } catch (error) {
        if (error instanceof z.ZodError) {
          consola.error('Invalid configuration:', error.errors);
          process.exit(1);
        }

        throw error;
      }

      const registryIndex = await getRegistryIndex();
      spinner.stop();

      const selectedComponents = await getSelectedComponents(options, registryIndex);

      if (!selectedComponents?.length) {
        consola.warn('No components selected. Exiting.');
        process.exit(0);
      }

      const { payload, baseColor } = await getRegistryPayload(config, selectedComponents, registryIndex);

      if (!payload.length) {
        consola.warn('Selected components not found. Exiting.');
        process.exit(0);
      }

      await confirmProceed(options);
      await processPayload(payload, options, config, baseColor, cwd, selectedComponents);

      consola.success('Done.');
    } catch (error) {
      if (error instanceof ComponentInstallError) {
        consola.error(`Failed to install component ${error.component}: ${error.message}`);
      }

      handleError(error);
    }
  });

function parseOptions(components: string[], opts: Record<string, unknown>): AddOptions {
  return addOptionsSchema.parse({
    components,
    ...opts,
  });
}

function validateAndResolveCwd(cwd: string): string {
  const resolvedCwd = path.resolve(cwd);

  if (!existsSync(resolvedCwd)) {
    consola.error(`The path ${resolvedCwd} does not exist. Try again.`);
    process.exit(1);
  }

  return resolvedCwd;
}

async function getConfigOrExit(cwd: string): Promise<Config> {
  const config = await getConfig(cwd);

  if (!config) {
    handleConfigIsMissing();
    process.exit(1);
  }

  return config;
}

async function getSelectedComponents(
  options: AddOptions,
  registryIndex: Awaited<ReturnType<typeof getRegistryIndex>>,
) {
  if (options.all) {
    return registryIndex.map(entry => entry.name);
  }

  if (options.components && options.components.length > 0) {
    return options.components;
  }

  const { components } = await prompts({
    type: 'multiselect',
    name: 'components',
    message: 'Which components would you like to add?',
    hint: '[Space] - select | [A] - toggle all | [Enter] - submit.',
    instructions: false,
    choices: registryIndex.map(entry => ({
      title: entry.name,
      value: entry.name,
      selected: options.all ? true : options.components?.includes(entry.name),
    })),
  });

  return components;
}

async function getRegistryPayload(
  config: Config,
  selectedComponents: string[],
  registryIndex: Awaited<ReturnType<typeof getRegistryIndex>>,
) {
  const tree = await resolveTree(registryIndex, selectedComponents);
  const payload = await fetchTree(config.styleSystem, tree);
  const baseColor = await getRegistryBaseColor(config.baseColor);
  return { payload, baseColor };
}

async function confirmProceed(options: AddOptions) {
  if (!options.yes) {
    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message: 'Ready to install components and dependencies. Proceed?',
      initial: true,
    });

    if (!proceed) {
      process.exit(0);
    }
  }
}

async function processPayload(
  payload: Awaited<ReturnType<typeof fetchTree>>,
  options: AddOptions,
  config: Config,
  baseColor: z.infer<typeof registryBaseColorSchema>,
  cwd: string,
  selectedComponents: string[],
) {
  const spinner = ora('Installing components...').start();

  for (const item of payload) {
    spinner.text = `Installing ${item.name}...`;
    const targetDir = getItemTargetPath(
      config,
      item,
      options.path ? path.resolve(cwd, options.path) : undefined,
    );

    if (!targetDir) {
      continue;
    }

    await processItem(item, targetDir, options, config, baseColor, cwd, selectedComponents, spinner);
  }

  spinner.succeed();
}

async function processItem(
  item: Awaited<ReturnType<typeof fetchTree>>[number],
  targetDir: string,
  options: AddOptions,
  config: Config,
  baseColor: z.infer<typeof registryBaseColorSchema>,
  cwd: string,
  selectedComponents: string[],
  spinner: ReturnType<typeof ora>,
) {
  try {
    if (!existsSync(targetDir)) {
      await fs.mkdir(targetDir, { recursive: true });
    }

    const componentPath = path.resolve(targetDir, item.name);
    const existingComponent = item.files.filter(file =>
      existsSync(path.resolve(componentPath, file.name)),
    );

    if (existingComponent.length && !options.overwrite) {
      if (selectedComponents.includes(item.name)) {
        spinner.stop();
        const { overwrite } = await prompts({
          type: 'confirm',
          name: 'overwrite',
          message: `Component ${item.name} already exists. Would you like to overwrite?`,
          initial: false,
        });

        if (!overwrite) {
          consola.info(
            `Skipped ${item.name}. To overwrite, run with the ${colors.green(
              '--overwrite',
            )} flag.`,
          );
          return;
        }

        spinner.start(`Installing ${item.name}...`);
      } else {
        return;
      }
    }

    await installDependencies(item, cwd);
    await writeComponentFiles(item, componentPath, config, baseColor);
  } catch (error) {
    throw new ComponentInstallError(
      error instanceof Error ? error.message : 'Unknown error',
      item.name,
    );
  }
}

async function installDependencies(
  item: Awaited<ReturnType<typeof fetchTree>>[number],
  cwd: string,
) {
  const installTasks = [
    item.dependencies?.length && { type: 'dependencies', deps: item.dependencies, installer: addDependency },
    item.devDependencies?.length && { type: 'devDependencies', deps: item.devDependencies, installer: addDevDependency },
  ].filter(Boolean) as { type: 'dependencies' | 'devDependencies'; deps: string[]; installer: typeof addDependency | typeof addDevDependency }[];

  for (const task of installTasks) {
    try {
      consola.info(`Installing ${task.type}: ${task.deps.join(', ')}`);
      await task.installer(task.deps, { cwd });
      consola.success(`Successfully installed ${task.type}.`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new ComponentInstallError(
        `Failed to install ${task.type}: ${errorMessage}`,
        item.name,
      );
    }
  }
}

async function writeComponentFiles(
  item: Awaited<ReturnType<typeof fetchTree>>[number],
  componentDir: string,
  config: Config,
  baseColor: z.infer<typeof registryBaseColorSchema>,
) {
  if (!existsSync(componentDir)) {
    await fs.mkdir(componentDir, { recursive: true });
  }

  const files = item.files.map(file => ({
    ...file,
    path: path.resolve(componentDir, file.name),
  }));

  for (const file of files) {
    const content = await transform({
      filename: file.path,
      raw: file.content,
      config,
      baseColor,
    });

    const filePath = file.path;

    await fs.writeFile(filePath, content);
  }
}
