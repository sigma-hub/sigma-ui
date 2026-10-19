import process from 'node:process';
import { Command } from 'commander';
import { viewOptionsSchema } from '@/src/schemas';
import { handleError } from '@/src/utils/handle-error';
import { fetchRegistryItem } from '@/src/utils/registry';
import { getRegistryContext } from '@/src/utils/registry-context';

export const view = new Command()
  .name('view')
  .description('print registry items as JSON without installing them')
  .argument('<items...>', 'names, @namespace/names, URLs, or paths to registry item JSON files')
  .option('-c, --cwd <cwd>', 'the working directory. defaults to the current directory.', process.cwd())
  .option('-s, --style <style>', 'the style system to view (tailwind or css). defaults to the project config.')
  .action(async (items: string[], opts: Record<string, unknown>) => {
    try {
      const options = viewOptionsSchema.parse({ items, ...opts });
      const context = await getRegistryContext(options.cwd, options.style);
      const results = await Promise.all(options.items.map(item => fetchRegistryItem(item, context)));

      process.stdout.write(`${JSON.stringify(results.map(result => result.item), null, 2)}\n`);
    } catch (error) {
      handleError(error);
    }
  });
