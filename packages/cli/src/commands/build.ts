import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import process from 'node:process';
import path from 'pathe';
import { Command } from 'commander';
import { consola } from 'consola';
import { colors } from 'consola/utils';
import { writeRegistry } from '@sigma-ui/shared/registry';
import { buildOptionsSchema, registrySchema } from '@/src/schemas';
import { handleError } from '@/src/utils/handle-error';

export const build = new Command()
  .name('build')
  .description('build a custom registry into static JSON files that "sigma-ui add" can install from')
  .argument('[registry]', 'path to the registry.json file', './registry.json')
  .option('-o, --output <path>', 'the output directory', './public/r')
  .option('-c, --cwd <cwd>', 'the working directory. defaults to the current directory.', process.cwd())
  .action(async (registry: string, opts: Record<string, unknown>) => {
    try {
      const options = buildOptionsSchema.parse({ registry, ...opts });
      await runBuild(options.registry, options.output, options.cwd);
    } catch (error) {
      handleError(error);
    }
  });

export async function runBuild(registry: string, output: string, cwd: string) {
  const registryPath = path.resolve(cwd, registry);

  if (!existsSync(registryPath)) {
    throw new Error(`Registry file not found at ${registryPath}.`);
  }

  const result = registrySchema.safeParse(JSON.parse(await readFile(registryPath, 'utf8')));

  if (!result.success) {
    const issues = result.error.issues.map(issue => `${issue.path.join('.') || 'registry'}: ${issue.message}`).join('\n  ');
    throw new Error(`Invalid registry file ${registryPath}:\n  ${issues}`);
  }

  const outputDirectory = path.resolve(cwd, output);
  const writtenFiles = await writeRegistry({
    registry: result.data,
    sourceRoot: path.dirname(registryPath),
    outputDirectory,
  });

  consola.success(`Built ${result.data.items.length} items into ${path.relative(cwd, outputDirectory) || '.'}`);
  consola.info(`Install them with ${colors.green(`npx sigma-ui add ${path.join(outputDirectory, '<name>.json')}`)} or add a "registries" entry pointing to ${colors.cyan('https://<your-host>/r/{name}.json')}.`);

  return writtenFiles;
}
