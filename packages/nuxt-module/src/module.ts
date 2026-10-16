import { resolve } from 'node:path';
import { addComponent, addTemplate, defineNuxtModule, findPath, resolvePath, useLogger } from '@nuxt/kit';
import { UTILS_TEMPLATE } from '@sigma-ui/shared/templates/tailwind-config';
import { ignorePatternsForComponentDir, isComponentIndexFile, scanComponentExports } from './components';
import { setupTailwind, type TailwindOption } from './tailwind';

export interface ModuleOptions {
  /**
   * Prefix for all the imported components.
   */
  prefix?: string;
  /**
   * Directory that the components live in. Accepts Nuxt aliases (such as `@/` or `~/`, which point at `srcDir`)
   * and paths relative to `rootDir`. Match it to `aliases.components` in `sigma-ui.config.json`.
   * @default "@/components/ui"
   */
  componentDir?: string;
  /**
   * Registers the `@tailwindcss/vite` plugin for Tailwind v4 projects.
   * `'auto'` registers it when `@tailwindcss/vite` is installed and not already in `vite.plugins`.
   * @default "auto"
   */
  tailwind?: TailwindOption;
}

const UTILS_ALIAS = '@/lib/utils';
const DEFAULT_COMPONENT_DIR = '@/components/ui';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'sigma-ui-nuxt',
    configKey: 'sigmaUi',
    compatibility: {
      nuxt: '>=3.21.0',
    },
  },
  defaults: {
    prefix: '',
    componentDir: DEFAULT_COMPONENT_DIR,
    tailwind: 'auto',
  },
  async setup(options, nuxt) {
    const logger = useLogger('sigma-ui-nuxt');
    const prefix = options.prefix ?? '';
    const componentsPath = await resolvePath(options.componentDir ?? DEFAULT_COMPONENT_DIR, { type: 'dir' });

    const projectUtilsPath = await findPath(UTILS_ALIAS);

    if (!projectUtilsPath) {
      const utilsTemplate = addTemplate({
        filename: 'sigma-ui-nuxt/utils.ts',
        getContents: () => UTILS_TEMPLATE,
        write: true,
      });

      nuxt.options.alias = { [UTILS_ALIAS]: utilsTemplate.dst, ...nuxt.options.alias };
    }

    await setupTailwind(options.tailwind ?? 'auto', nuxt, logger);

    nuxt.hook('components:dirs', (dirs) => {
      for (const dir of dirs) {
        if (typeof dir === 'string' || !dir.path) {
          continue;
        }

        const patterns = ignorePatternsForComponentDir(componentsPath, dir.path);

        if (patterns.length === 0) {
          continue;
        }

        dir.ignore = [...(dir.ignore ?? []), ...patterns];
      }
    });

    const componentExports = await scanComponentExports(componentsPath, (filePath, error) => {
      logger.warn(`Skipped components from \`${filePath}\`: ${error instanceof Error ? error.message : String(error)}`);
    });

    for (const { exportName, filePath } of componentExports) {
      addComponent({
        name: `${prefix}${exportName}`,
        export: exportName,
        filePath,
        priority: 1,
      });
    }

    if (nuxt.options.dev) {
      nuxt.hook('builder:watch', async (event, path) => {
        if (event === 'addDir' || event === 'unlinkDir') {
          return;
        }

        if (isComponentIndexFile(componentsPath, resolve(nuxt.options.srcDir, path))) {
          logger.info('Component exports changed, restarting Nuxt to update auto-imports...');
          await nuxt.callHook('restart');
        }
      });
    }
  },
});
