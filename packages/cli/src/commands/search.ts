import process from 'node:process';
import { Command } from 'commander';
import { consola } from 'consola';
import { colors } from 'consola/utils';
import { searchOptionsSchema, type RegistryItem } from '@/src/schemas';
import { handleError } from '@/src/utils/handle-error';
import { fetchRegistryIndex, searchRegistryItems } from '@/src/utils/registry';
import { getRegistryContext } from '@/src/utils/registry-context';

interface SearchResult {
  registry: string;
  items: RegistryItem[];
}

export const search = new Command()
  .name('search')
  .alias('list')
  .description('search or list items from the sigma-ui registry and configured namespaces')
  .argument('[registries...]', 'registry namespaces to search, e.g. @acme. defaults to the sigma-ui registry.')
  .option('-q, --query <query>', 'only show items whose name, title, description, or categories match')
  .option('-t, --type <type>', 'only show items of this type, e.g. ui or block')
  .option('-c, --cwd <cwd>', 'the working directory. defaults to the current directory.', process.cwd())
  .option('-s, --style <style>', 'the style system to search (tailwind or css). defaults to the project config.')
  .option('--json', 'print the results as JSON', false)
  .action(async (registries: string[], opts: Record<string, unknown>) => {
    try {
      const options = searchOptionsSchema.parse({ registries, ...opts });
      const context = await getRegistryContext(options.cwd, options.style);
      const namespaces = options.registries.length ? options.registries : [null];

      const results: SearchResult[] = await Promise.all(namespaces.map(async (namespace) => {
        const index = await fetchRegistryIndex(namespace, context);
        return {
          registry: namespace ?? index.name,
          items: searchRegistryItems(index.items, options),
        };
      }));

      if (options.json) {
        process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
        return;
      }

      printResults(results, namespaces);
    } catch (error) {
      handleError(error);
    }
  });

function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  return maxLength > 3 ? `${text.slice(0, maxLength - 3)}...` : '';
}

function printResults(results: SearchResult[], namespaces: (string | null)[]) {
  results.forEach((result, resultIndex) => {
    const namespace = namespaces[resultIndex];
    const names = result.items.map(item => (namespace ? `${namespace}/${item.name}` : item.name));
    const nameWidth = Math.max(0, ...names.map(name => name.length));

    consola.log(colors.bold(`${result.registry} (${result.items.length})`));

    result.items.forEach((item, itemIndex) => {
      const name = `  ${names[itemIndex].padEnd(nameWidth)}  `;
      const type = `${item.type.replace('registry:', '').padEnd(6)} `;
      const description = truncate(item.description ?? '', (process.stdout.columns ?? Infinity) - name.length - type.length);
      consola.log(`${name}${colors.dim(type)}${description}`.trimEnd());
    });

    consola.log('');
  });

  consola.info(`Add an item with ${colors.green('npx sigma-ui add <name>')} or inspect it with ${colors.green('npx sigma-ui view <name>')}.`);
}
