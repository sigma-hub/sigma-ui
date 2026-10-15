import { addComponent, addComponentsDir, addTemplate, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit';
import { UTILS_TEMPLATE } from '@sigma-ui/shared/templates/tailwind-config';
import { scanComponentExports } from './components';

export interface ModuleOptions {
  /**
   * Prefix for all the imported components.
   */
  prefix?: string;
  /**
   * Directory that the components live in.
   * @default "./components/ui"
   */
  componentDir?: string;
}

const UTILS_ALIAS = '@/lib/utils';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'sigmaUi',
    configKey: 'sigmaUi',
  },
  defaults: {
    prefix: '',
    componentDir: './components/ui',
  },
  async setup(options, nuxt) {
    const logger = useLogger('sigma-ui-nuxt');
    const { resolve } = createResolver(nuxt.options.rootDir);
    const prefix = options.prefix ?? '';
    const componentsPath = resolve(options.componentDir ?? './components/ui');

    const utilsTemplate = addTemplate({
      filename: 'sigma-ui-nuxt/utils.ts',
      getContents: () => UTILS_TEMPLATE,
      write: true,
    });

    nuxt.options.alias = { [UTILS_ALIAS]: utilsTemplate.dst, ...nuxt.options.alias };

    addComponentsDir({
      path: componentsPath,
      extensions: [],
      ignore: ['**/*'],
    }, { prepend: true });

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
  },
});
