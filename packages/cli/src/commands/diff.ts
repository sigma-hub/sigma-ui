import { existsSync, promises as fs } from 'node:fs';
import process from 'node:process';
import path from 'pathe';
import { consola } from 'consola';
import { colors } from 'consola/utils';
import { Command } from 'commander';
import { type Change, diffLines } from 'diff';
import { z } from 'zod';
import { getConfig, handleConfigIsMissing } from '@/src/utils/get-config';
import { handleError } from '@/src/utils/handle-error';
import {
  fetchTree,
  getItemTargetPath,
  getRegistryBaseColor,
  getRegistryIndex,
} from '@/src/utils/registry';
import {
  type registryIndexSchema,
  type Config,
  diffOptionsSchema,
} from '@/src/schemas';
import { transform } from '@/src/utils/transformers';

type DiffOptions = z.infer<typeof diffOptionsSchema>;

interface ComponentChange {
  file: string;
  filePath: string;
  patch: Change[];
}

interface ComponentWithUpdates {
  name: string;
  changes: ComponentChange[];
}

export const diff = new Command()
  .name('diff')
  .description('check for updates against the registry')
  .argument('[component]', 'the component name')
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .action(async (name, opts) => {
    try {
      const options = parseOptions(name, opts);
      const cwd = validateAndResolveCwd(options.cwd);
      const config = await getConfigOrExit(cwd);
      const registryIndex = await getRegistryIndex();

      if (!options.component) {
        await handleAllComponentsDiff(config, registryIndex);
      } else {
        await handleSingleComponentDiff(options.component, config, registryIndex);
      }
    } catch (error) {
      handleError(error);
    }
  });

function parseOptions(name: string | undefined, opts: any): DiffOptions {
  return diffOptionsSchema.parse({
    component: name,
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

async function handleAllComponentsDiff(
  config: Config,
  registryIndex: Awaited<ReturnType<typeof getRegistryIndex>>,
): Promise<void> {
  const targetDir = config.resolvedPaths.components;
  const projectComponents = findProjectComponents(registryIndex, targetDir);
  const componentsWithUpdates = await checkForUpdates(projectComponents, config);

  if (!componentsWithUpdates.length) {
    consola.info('No updates found.');
    process.exit(0);
  }

  displayAvailableUpdates(componentsWithUpdates);
  process.exit(0);
}

function findProjectComponents(
  registryIndex: Awaited<ReturnType<typeof getRegistryIndex>>,
  targetDir: string,
) {
  return registryIndex.filter((item) => {
    return item.files.some((file) => {
      const fullPath = path.resolve(targetDir, item.name, file);
      return existsSync(fullPath);
    });
  });
}

async function handleSingleComponentDiff(
  componentName: string,
  config: Config,
  registryIndex: Awaited<ReturnType<typeof getRegistryIndex>>,
): Promise<void> {
  const component = registryIndex.find(item => item.name === componentName);

  if (!component) {
    consola.error(`The component ${colors.green(componentName)} does not exist.`);
    process.exit(1);
  }

  const changes = await diffComponent(component, config);

  if (!changes.length) {
    consola.info(`No updates found for ${componentName}.`);
    process.exit(0);
  }

  displayComponentChanges(changes);
}

async function checkForUpdates(
  components: z.infer<typeof registryIndexSchema>,
  config: Config,
): Promise<ComponentWithUpdates[]> {
  const componentsWithUpdates: ComponentWithUpdates[] = [];

  for (const component of components) {
    const changes = await diffComponent(component, config);

    if (changes.length) {
      componentsWithUpdates.push({
        name: component.name,
        changes,
      });
    }
  }

  return componentsWithUpdates;
}

function displayAvailableUpdates(componentsWithUpdates: ComponentWithUpdates[]): void {
  consola.info('The following components have updates available:');

  for (const component of componentsWithUpdates) {
    consola.info(`- ${component.name}`);

    for (const change of component.changes) {
      consola.info(`  - ${change.filePath}`);
    }
  }

  consola.log('');
  consola.info(`Run ${colors.green('diff <component>')} to see the changes.`);
}

function displayComponentChanges(changes: ComponentChange[]): void {
  for (const change of changes) {
    consola.info(`- ${change.filePath}`);
    printDiff(change.patch);
    consola.log('');
  }
}

async function diffComponent(
  component: z.infer<typeof registryIndexSchema>[number],
  config: Config,
): Promise<ComponentChange[]> {
  const payload = await fetchTree(config.styleSystem, [component]);
  const baseColor = await getRegistryBaseColor(config.baseColor);
  const changes: ComponentChange[] = [];

  for (const item of payload) {
    const targetDir = await getItemTargetPath(config, item);

    if (!targetDir) {
      continue;
    }

    await processItemFiles(item, targetDir, config, baseColor, changes);
  }

  return changes;
}

async function processItemFiles(
  item: Awaited<ReturnType<typeof fetchTree>>[number],
  targetDir: string,
  config: Config,
  baseColor: any,
  changes: ComponentChange[],
): Promise<void> {
  for (const file of item.files) {
    const filePath = path.resolve(targetDir, item.name, file.name);

    if (!existsSync(filePath)) {
      continue;
    }

    const fileContent = await fs.readFile(filePath, 'utf8');
    const registryContent = await transform({
      filename: file.name,
      raw: file.content,
      config,
      baseColor,
    });

    const patch = diffLines(fileContent, registryContent);

    if (patch.length > 1) {
      changes.push({
        file: file.name,
        filePath,
        patch,
      });
    }
  }
}

function printDiff(diff: Change[]): void {
  diff.forEach((part) => {
    if (part) {
      if (part.added) {
        process.stdout.write(colors.green(part.value));
        return;
      }

      if (part.removed) {
        process.stdout.write(colors.red(part.value));
        return;
      }

      process.stdout.write(part.value);
    }
  });
}
