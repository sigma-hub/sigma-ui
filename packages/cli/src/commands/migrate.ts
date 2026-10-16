import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import process from 'node:process';
import path from 'pathe';
import { Command } from 'commander';
import { consola } from 'consola';
import { colors } from 'consola/utils';
import prompts from 'prompts';
import { CONFIG_FILE_PATH, INIT_COMMAND } from '@sigma-ui/shared/consts';
import { migrateOptionsSchema } from '@/src/schemas';
import { readRawConfigFile, resolveConfigPaths } from '@/src/utils/get-config';
import { getProjectInfo } from '@/src/utils/get-project-info';
import { handleError } from '@/src/utils/handle-error';
import { migrateConfig } from '@/src/utils/migrate/config';
import {
  applyImportRewrites,
  planComponentDirectoryRenames,
  planImportRewrites,
  renameComponentDirectories,
} from '@/src/utils/migrate/components';

export const migrate = new Command()
  .name('migrate')
  .description('upgrade a sigma-ui 1.x project to 2.0: config shape, kebab-case component directories, and imports')
  .option('-y, --yes', 'skip the confirmation prompt', false)
  .option('-c, --cwd <cwd>', 'the working directory. defaults to the current directory.', process.cwd())
  .option('--dry-run', 'show the planned changes without writing anything', false)
  .action(async (opts: Record<string, unknown>) => {
    try {
      const options = migrateOptionsSchema.parse(opts);
      await runMigrate(path.resolve(options.cwd), options);
    } catch (error) {
      handleError(error);
    }
  });

export async function runMigrate(cwd: string, options: { yes: boolean; dryRun: boolean }) {
  if (!existsSync(path.join(cwd, CONFIG_FILE_PATH))) {
    throw new Error(`No ${CONFIG_FILE_PATH} found in ${cwd}. Run ${INIT_COMMAND} to set up a new project.`);
  }

  const rawConfig = await readRawConfigFile(cwd);
  const projectInfo = await getProjectInfo(cwd);
  const { config, changes } = migrateConfig(rawConfig ?? {}, projectInfo.framework);
  const { resolvedPaths } = await resolveConfigPaths(cwd, config);
  const { renames, conflicts } = await planComponentDirectoryRenames(resolvedPaths.components);
  const rewrites = await planImportRewrites(cwd, resolvedPaths.components, config.aliases.components, renames);

  for (const conflict of conflicts) {
    consola.warn(`Skipping a component directory: ${conflict}. Merge them by hand.`);
  }

  if (!changes.length && !renames.length) {
    consola.success('The project is already on the 2.0 format.');
    return { changes, renames, rewrites };
  }

  printPlan(cwd, changes, renames, rewrites.map(rewrite => rewrite.file), resolvedPaths.components);

  if (options.dryRun) {
    consola.info('Dry run: nothing was changed.');
    return { changes, renames, rewrites };
  }

  if (!options.yes && process.stdout.isTTY) {
    const { proceed } = await prompts({ type: 'confirm', name: 'proceed', message: 'Apply these changes?', initial: true });

    if (!proceed) {
      return { changes, renames, rewrites };
    }
  }

  await writeFile(path.join(cwd, CONFIG_FILE_PATH), `${JSON.stringify(config, null, 2)}\n`, 'utf8');
  await applyImportRewrites(rewrites);
  await renameComponentDirectories(resolvedPaths.components, renames);

  consola.success('Migrated to sigma-ui 2.0.');
  consola.info(`Compare your components with the 2.0 registry using ${colors.green('npx sigma-ui add --diff')}.`);

  return { changes, renames, rewrites };
}

function printPlan(cwd: string, changes: string[], renames: { from: string; to: string }[], rewrittenFiles: string[], componentsDirectory: string) {
  if (changes.length) {
    consola.info(`${CONFIG_FILE_PATH}:`);
    changes.forEach(change => consola.log(`  ${change}`));
  }

  if (renames.length) {
    consola.info(`Component directories in ${path.relative(cwd, componentsDirectory) || '.'}:`);
    renames.forEach(({ from, to }) => consola.log(`  ${from} -> ${to}`));
  }

  if (rewrittenFiles.length) {
    consola.info('Imports to update:');
    rewrittenFiles.forEach(file => consola.log(`  ${path.relative(cwd, file)}`));
  }
}
