import { addVitePlugin, directoryToURL, hasNuxtModule, tryImportModule, type useLogger } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';

export type TailwindOption = boolean | 'auto';

type VitePlugins = Parameters<typeof addVitePlugin>[0];

const TAILWIND_VITE_PACKAGE = '@tailwindcss/vite';
const LEGACY_TAILWIND_MODULE = '@nuxtjs/tailwindcss';

function hasTailwindVitePlugin(plugins: unknown): boolean {
  if (!Array.isArray(plugins)) {
    return false;
  }

  return plugins.flat(Infinity).some((plugin: unknown) => {
    const name = typeof plugin === 'object' && plugin !== null && 'name' in plugin ? plugin.name : undefined;
    return typeof name === 'string' && name.startsWith(TAILWIND_VITE_PACKAGE);
  });
}

export async function setupTailwind(
  option: TailwindOption,
  nuxt: Nuxt,
  logger: ReturnType<typeof useLogger>,
): Promise<boolean> {
  if (option === false) {
    return false;
  }

  if (hasNuxtModule(LEGACY_TAILWIND_MODULE, nuxt)) {
    logger.warn(`\`${LEGACY_TAILWIND_MODULE}\` is installed, so \`${TAILWIND_VITE_PACKAGE}\` is not registered. SIGMA-UI components target Tailwind v4: replace \`${LEGACY_TAILWIND_MODULE}\` with \`${TAILWIND_VITE_PACKAGE}\`.`);
    return false;
  }

  if (hasTailwindVitePlugin(nuxt.options.vite.plugins)) {
    return false;
  }

  const tailwindcss = await tryImportModule<() => VitePlugins>(TAILWIND_VITE_PACKAGE, {
    url: [nuxt.options.rootDir, ...nuxt.options.modulesDir].map(directoryToURL),
  });

  if (typeof tailwindcss !== 'function') {
    if (option === true) {
      logger.warn(`\`tailwind\` is enabled, but \`${TAILWIND_VITE_PACKAGE}\` is not installed. Install it with \`npm install -D tailwindcss ${TAILWIND_VITE_PACKAGE}\`.`);
    }

    return false;
  }

  addVitePlugin(tailwindcss());
  return true;
}
