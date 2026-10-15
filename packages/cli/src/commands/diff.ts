import process from 'node:process';
import { consola } from 'consola';
import { colors } from 'consola/utils';
import { Command } from 'commander';
import { addOptionsSchema } from '@/src/schemas';
import { handleError } from '@/src/utils/handle-error';
import { runAdd } from '@/src/commands/add';

export const diff = new Command()
  .name('diff')
  .description('deprecated: use "add --diff" instead')
  .argument('[component]', 'the component name')
  .option('-c, --cwd <cwd>', 'the working directory. defaults to the current directory.', process.cwd())
  .action(async (component: string | undefined, opts: { cwd: string }) => {
    consola.warn(`"sigma-ui diff" is deprecated. Use ${colors.green(`sigma-ui add ${component ?? ''} --diff`.replace('  ', ' '))} instead.`);

    try {
      await runAdd(addOptionsSchema.parse({
        components: component ? [component] : [],
        cwd: opts.cwd,
        yes: true,
        overwrite: false,
        all: false,
        dryRun: false,
        diff: true,
      }));
    } catch (error) {
      handleError(error);
    }
  });
