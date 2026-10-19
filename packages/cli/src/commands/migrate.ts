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
import { findUnlayeredPreflightImports, migrateThemeCss, readCssFile, writeCssFile } from '@/src/utils/migrate/css';
import { registerTailwindVitePlugin } from '@/src/utils/framework-config';
import { excludeInstalledDependencies } from '@/src/utils/install-plan';
import { getInstalledPackages, installPackages } from '@/src/utils/package-manager';

export const migrate = new Command()
  .name('migrate')
  .description('upgrade a sigma-ui 1.x project to 2.0: config, kebab-case directories, imports, and theme CSS')
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
  const currentCss = await readCssFile(resolvedPaths.tailwindCss);
  const cssMigration = currentCss
    ? migrateThemeCss(currentCss, {
        styleSystem: config.styleSystem,
        hasJsConfig: Boolean(config.tailwind.config),
      })
    : { css: '', changes: [], instructions: [] };

  if (config.styleSystem === 'css') {
    cssMigration.instructions.push(...await cssLayerInstructions(cwd, resolvedPaths.tailwindCss, Boolean(currentCss)));
  }

  for (const conflict of conflicts) {
    consola.warn(`Skipping a component directory: ${conflict}. Merge them by hand.`);
  }

  if (!changes.length && !renames.length && !cssMigration.changes.length) {
    consola.success('The project is already on the 2.0 format.');
    cssMigration.instructions.forEach(instruction => consola.info(instruction));
    return { changes, renames, rewrites, cssChanges: cssMigration.changes };
  }

  printPlan(
    cwd,
    changes,
    renames,
    rewrites.map(rewrite => rewrite.file),
    resolvedPaths.components,
    resolvedPaths.tailwindCss,
    cssMigration.changes,
  );

  if (options.dryRun) {
    consola.info('Dry run: nothing was changed.');
    cssMigration.instructions.forEach(instruction => consola.info(instruction));
    return { changes, renames, rewrites, cssChanges: cssMigration.changes };
  }

  if (!options.yes && process.stdout.isTTY) {
    const { proceed } = await prompts({ type: 'confirm', name: 'proceed', message: 'Apply these changes?', initial: true });

    if (!proceed) {
      return { changes, renames, rewrites, cssChanges: cssMigration.changes };
    }
  }

  await writeFile(path.join(cwd, CONFIG_FILE_PATH), `${JSON.stringify(config, null, 2)}\n`, 'utf8');
  await applyImportRewrites(rewrites);
  await renameComponentDirectories(resolvedPaths.components, renames);

  if (currentCss && cssMigration.changes.length) {
    await writeCssFile(resolvedPaths.tailwindCss, cssMigration.css);
  }

  if (config.styleSystem === 'tailwind') {
    const pluginResult = await registerTailwindVitePlugin(cwd, config.framework);

    if (pluginResult.status === 'updated') {
      consola.log(`  ${colors.yellow('~')} ${path.relative(cwd, pluginResult.file)}`);
    }

    const packagesToInstall = excludeInstalledDependencies(
      ['tw-animate-css', '@tailwindcss/vite'],
      getInstalledPackages(cwd),
    );

    if (packagesToInstall.length) {
      await installPackages(packagesToInstall, { cwd, dev: true, silent: true });
    }
  }

  consola.success('Migrated to sigma-ui 2.0.');
  cssMigration.instructions.forEach(instruction => consola.info(instruction));
  consola.info(`Compare your components with the 2.0 registry using ${colors.green('npx sigma-ui add --diff')}.`);
  consola.info(`Read the 1.x to 2.0 guide: ${colors.green('https://sigma-ui.dev/docs/migration')}.`);

  return { changes, renames, rewrites, cssChanges: cssMigration.changes };
}

function printPlan(
  cwd: string,
  changes: string[],
  renames: { from: string; to: string }[],
  rewrittenFiles: string[],
  componentsDirectory: string,
  cssPath: string,
  cssChanges: string[],
) {
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

  if (cssChanges.length) {
    consola.info(`Stylesheet ${path.relative(cwd, cssPath) || '.'}:`);
    cssChanges.forEach(change => consola.log(`  ${change}`));
  }
}

async function cssLayerInstructions(cwd: string, cssPath: string, hasCssFile: boolean) {
  const instructions: string[] = [];

  if (!hasCssFile) {
    instructions.push(`No stylesheet at ${path.relative(cwd, cssPath)} (cssPath in ${CONFIG_FILE_PATH}). Add \`@layer base, components;\` to the top of your main stylesheet so CSS style components keep their styles.`);
  }

  const unlayered = await findUnlayeredPreflightImports(path.join(cwd, 'src'), hasCssFile ? [cssPath] : []);

  for (const file of unlayered) {
    instructions.push(`${path.relative(cwd, file)} imports preflight.css outside a cascade layer, so its resets beat the component styles. Change it to \`@import "./preflight.css" layer(base);\`.`);
  }

  return instructions;
}
