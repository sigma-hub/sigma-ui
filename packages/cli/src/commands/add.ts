import { existsSync, promises as fs } from 'node:fs';
import process from 'node:process';
import path from 'pathe';
import { consola } from 'consola';
import { colors } from 'consola/utils';
import { Command } from 'commander';
import { diffLines } from 'diff';
import ora from 'ora';
import prompts from 'prompts';
import { addOptionsSchema, type AddOptions, type Config } from '@/src/schemas';
import { getConfigOrExit, getDerivedAliases } from '@/src/utils/get-config';
import { handleError } from '@/src/utils/handle-error';
import { createInstallPlan, excludeInstalledDependencies, type InstallPlan, type PlannedFile } from '@/src/utils/install-plan';
import { planComponentDirectoryRenames } from '@/src/utils/migrate/components';
import { isLegacyThemeCss, readCssFile } from '@/src/utils/migrate/css';
import { getInstalledPackages, installPackages } from '@/src/utils/package-manager';
import { fetchRegistryIndex, resolveRegistryTree, type RegistryContext } from '@/src/utils/registry';
import { kebabToPascal } from '@/src/utils/transformers/transform-component-naming';

export const add = new Command()
  .name('add')
  .description('add components and blocks to your project')
  .argument('[components...]', 'names, @namespace/names, URLs, or paths to registry item JSON files')
  .option('-y, --yes', 'skip confirmation prompts', false)
  .option('-o, --overwrite', 'overwrite existing files', false)
  .option('-c, --cwd <cwd>', 'the working directory. defaults to the current directory.', process.cwd())
  .option('-a, --all', 'add all available components', false)
  .option('-p, --path <path>', 'the directory to add the files to')
  .option('--dry-run', 'show what would be written and installed without changing anything', false)
  .option('--diff', 'show the differences between local files and the registry without changing anything', false)
  .action(async (components: string[], opts: Record<string, unknown>) => {
    try {
      await runAdd(addOptionsSchema.parse({ components, ...opts }));
    } catch (error) {
      handleError(error);
    }
  });

export async function runAdd(options: AddOptions) {
  const cwd = path.resolve(options.cwd);

  if (!existsSync(cwd)) {
    throw new Error(`The path ${cwd} does not exist.`);
  }

  const config = await getConfigOrExit(cwd);
  await assertProjectIsMigrated(config);
  const context: RegistryContext = { cwd, styleSystem: config.styleSystem, registries: config.registries };

  if (options.diff && !options.components?.length && !options.all) {
    await showInstalledComponentsDiff(config, context);
    return;
  }

  const selectedItems = await getSelectedItems(options, context);

  if (!selectedItems.length) {
    consola.warn('No components selected.');
    return;
  }

  const spinner = ora('Resolving components...').start();
  const tree = await resolveRegistryTree(selectedItems, context).finally(() => spinner.stop());
  const plan = await createInstallPlan(tree, config, {
    pathOverride: options.path ? path.resolve(cwd, options.path) : undefined,
  });

  if (options.diff) {
    printPlanDiff(plan, cwd);
    return;
  }

  const installedPackages = getInstalledPackages(cwd);
  plan.dependencies = excludeInstalledDependencies(plan.dependencies, installedPackages);
  plan.devDependencies = excludeInstalledDependencies(plan.devDependencies, installedPackages);

  if (options.dryRun) {
    printDryRun(plan, cwd);
    return;
  }

  const skippedItems = await getItemsToSkip(plan, options);
  const filesToWrite = plan.files.filter(file => file.status !== 'unchanged' && !skippedItems.has(file.itemName));

  await writePlannedFiles(filesToWrite);
  await installPlanDependencies(plan, cwd);
  printSummary(plan, filesToWrite, skippedItems, config, cwd);
}

async function getSelectedItems(options: AddOptions, context: RegistryContext) {
  if (options.components?.length) {
    return options.components;
  }

  const index = await fetchRegistryIndex(null, context);

  if (options.all) {
    const uiItems = index.items.filter(item => item.type === 'registry:ui').map(item => item.name);

    if (!options.yes && process.stdout.isTTY) {
      const { proceed } = await prompts({
        type: 'confirm',
        name: 'proceed',
        message: `Add all ${uiItems.length} components?`,
        initial: true,
      });

      if (!proceed) {
        return [];
      }
    }

    return uiItems;
  }

  const { components } = await prompts({
    type: 'autocompleteMultiselect',
    name: 'components',
    message: 'Which components would you like to add?',
    hint: 'Type to filter, [Space] to select, [Enter] to submit.',
    instructions: false,
    choices: index.items.map(item => ({
      title: item.type === 'registry:block' ? `${item.name} ${colors.dim('(block)')}` : item.name,
      description: item.description,
      value: item.name,
    })),
  });

  return (components as string[] | undefined) ?? [];
}

async function getItemsToSkip(plan: InstallPlan, options: AddOptions) {
  const skippedItems = new Set<string>();

  if (options.overwrite) {
    return skippedItems;
  }

  const changedItems = [...new Set(plan.files.filter(file => file.status === 'update').map(file => file.itemName))];

  for (const itemName of changedItems) {
    const isRequested = plan.items.some(({ item, requested }) => requested && item.name === itemName);

    if (!isRequested || options.yes || !process.stdout.isTTY) {
      skippedItems.add(itemName);
      continue;
    }

    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: `${itemName} already exists and differs from the registry. Overwrite it?`,
      initial: false,
    });

    if (!overwrite) {
      skippedItems.add(itemName);
    }
  }

  return skippedItems;
}

async function writePlannedFiles(files: PlannedFile[]) {
  for (const file of files) {
    await fs.mkdir(path.dirname(file.targetPath), { recursive: true });
    await fs.writeFile(file.targetPath, file.content, 'utf8');
  }
}

async function installPlanDependencies(plan: InstallPlan, cwd: string) {
  if (!plan.dependencies.length && !plan.devDependencies.length) {
    return;
  }

  const spinner = ora('Installing dependencies...').start();

  try {
    await installPackages(plan.dependencies, { cwd, silent: true });
    await installPackages(plan.devDependencies, { cwd, dev: true, silent: true });
    spinner.succeed(`Installed ${[...plan.dependencies, ...plan.devDependencies].join(', ')}`);
  } catch (error) {
    spinner.fail('Failed to install dependencies.');
    const command = [...plan.dependencies, ...plan.devDependencies].join(' ');
    throw new Error(`Install them manually: ${command}\n${error instanceof Error ? error.message : ''}`);
  }
}

function relativePath(filePath: string, cwd: string) {
  return path.relative(cwd, filePath);
}

function printSummary(plan: InstallPlan, writtenFiles: PlannedFile[], skippedItems: Set<string>, config: Config, cwd: string) {
  const created = writtenFiles.filter(file => file.status === 'create');
  const updated = writtenFiles.filter(file => file.status === 'update');

  for (const file of created) {
    consola.log(`  ${colors.green('+')} ${relativePath(file.targetPath, cwd)}`);
  }

  for (const file of updated) {
    consola.log(`  ${colors.yellow('~')} ${relativePath(file.targetPath, cwd)}`);
  }

  for (const itemName of skippedItems) {
    consola.info(`Skipped ${itemName}: local files differ. Use ${colors.green('--overwrite')} to replace them or ${colors.green(`--diff ${itemName}`)} to compare.`);
  }

  if (!writtenFiles.length && !skippedItems.size) {
    consola.info('Everything is already up to date.');
  }

  for (const { item, requested } of plan.items) {
    if (requested && item.type === 'registry:block') {
      const componentName = kebabToPascal(item.name);
      const fileName = config.componentNaming === 'kebab-case' ? `${item.name}.vue` : `${componentName}.vue`;
      consola.info(`Use the block: ${colors.cyan(`import ${componentName} from '${getDerivedAliases(config).blocks}/${item.name}/${fileName}'`)}`);
    }

    if (requested && item.docs) {
      consola.info(item.docs);
    }
  }

  consola.success('Done.');
}

function printDryRun(plan: InstallPlan, cwd: string) {
  consola.info(`Items: ${plan.items.map(({ item, requested }) => (requested ? item.name : colors.dim(item.name))).join(', ')}`);

  for (const file of plan.files) {
    const marker = { create: colors.green('create'), update: colors.yellow('update'), unchanged: colors.dim('unchanged') }[file.status];
    consola.log(`  ${marker} ${relativePath(file.targetPath, cwd)}`);
  }

  if (plan.dependencies.length) {
    consola.info(`Would install: ${plan.dependencies.join(' ')}`);
  }

  if (plan.devDependencies.length) {
    consola.info(`Would install as devDependencies: ${plan.devDependencies.join(' ')}`);
  }

  consola.info('Dry run: no files were written and nothing was installed.');
}

function printFileDiff(file: PlannedFile, cwd: string) {
  consola.log(colors.bold(`--- ${relativePath(file.targetPath, cwd)}`));

  for (const part of diffLines(file.currentContent ?? '', file.content)) {
    const text = part.value.replace(/\n$/, '').split('\n');

    if (part.added) {
      text.forEach(line => consola.log(colors.green(`+ ${line}`)));
    } else if (part.removed) {
      text.forEach(line => consola.log(colors.red(`- ${line}`)));
    }
  }

  consola.log('');
}

function printPlanDiff(plan: InstallPlan, cwd: string) {
  const changedFiles = plan.files.filter(file => file.status === 'update');
  const missingFiles = plan.files.filter(file => file.status === 'create');

  changedFiles.forEach(file => printFileDiff(file, cwd));
  missingFiles.forEach(file => consola.log(`${colors.green('new file')} ${relativePath(file.targetPath, cwd)}`));

  if (!changedFiles.length && !missingFiles.length) {
    consola.info('No differences found.');
  }
}

async function showInstalledComponentsDiff(config: Config, context: RegistryContext) {
  const index = await fetchRegistryIndex(null, context);
  const installed = index.items
    .filter(item => item.type === 'registry:ui' && existsSync(path.join(config.resolvedPaths.components, item.name)))
    .map(item => item.name);

  if (!installed.length) {
    consola.info('No installed components found.');
    return;
  }

  const tree = await resolveRegistryTree(installed, context);
  const plan = await createInstallPlan(tree.filter(entry => entry.requested), config);
  const changedItems = [...new Set(plan.files.filter(file => file.status === 'update').map(file => file.itemName))];

  if (!changedItems.length) {
    consola.info('All installed components match the registry.');
    return;
  }

  consola.info('These components differ from the registry:');
  changedItems.forEach(itemName => consola.log(`  - ${itemName}`));
  consola.info(`Run ${colors.green('sigma-ui add <component> --diff')} to see the changes.`);
}

export async function assertProjectIsMigrated(config: Config) {
  const { renames } = await planComponentDirectoryRenames(config.resolvedPaths.components);

  if (renames.length) {
    const examples = renames.slice(0, 3).map(rename => rename.from).join(', ');
    const extra = renames.length > 3 ? ', ...' : '';
    throw new Error(
      `This project still uses 1.x component directories (${examples}${extra}). Run ${colors.green('npx sigma-ui migrate')} before adding 2.0 components.`,
    );
  }

  const css = await readCssFile(config.resolvedPaths.tailwindCss);

  if (css && isLegacyThemeCss(css, config.styleSystem)) {
    throw new Error(
      `The stylesheet still uses the 1.x theme format (HSL triplets, missing sidebar/accent/spacing tokens, or Tailwind 3 directives). Run ${colors.green('npx sigma-ui migrate')} first.`,
    );
  }
}
