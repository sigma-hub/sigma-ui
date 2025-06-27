import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { parseSync } from '@oxc-parser/wasm'
import { addComponent, addTemplate, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit'
import { UTILS_TEMPLATE } from '../../shared/templates/tailwind-config.ts'

export interface ModuleOptions {
  /**
   * Prefix for all the imported component.
   */
  prefix?: string
  /**
   * Directory that the component lives in.
   * @default "./components/ui"
   */
  componentDir?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'sigmaUi',
    configKey: 'sigmaUi',
  },
  defaults: {
    prefix: '',
    componentDir: './components/ui',
  },
  async setup({ prefix, componentDir }, nuxt) {
    const COMPONENT_DIR_PATH = componentDir!
    const ROOT_DIR_PATH = nuxt.options.rootDir
    const UTILS_ALIAS = '@/lib/utils' // Use the same path from the cli for backward compatibility
    const { resolve, resolvePath } = createResolver(ROOT_DIR_PATH)
    const logger = useLogger('sigma-ui-nuxt')

    // `lib/utils`
    const utilsTemplate = addTemplate({
      filename: 'sigma-ui-nuxt/utils.ts',
      getContents: () => UTILS_TEMPLATE,
      write: true,
    })

    // Add utils dir alias to the top to avoid conflicts with nuxt built in `@` alias
    nuxt.options.alias = { [UTILS_ALIAS]: utilsTemplate.dst, ...nuxt.options.alias }

    logger.info('[sigma-ui-nuxt] Generating auto imports for components...')

    // Components Auto Imports
    const componentsPath = resolve(COMPONENT_DIR_PATH)

    // Tell Nuxt to not scan `componentsDir` for auto imports as we will do it manually
    nuxt.hook('components:dirs', (dirs) => {
      dirs.unshift({
        path: componentsPath,
        extensions: [],
      })
    })

    // Manually scan `componentsDir` for components and register them for auto imports
    try {
      readdirSync(resolve(COMPONENT_DIR_PATH))
        .forEach(async (dir) => {
          try {
            const filePath = await resolvePath(join(COMPONENT_DIR_PATH, dir, 'index'), { extensions: ['.ts', '.js'] })
            const content = readFileSync(filePath, { encoding: 'utf8' })
            const ast = parseSync(content, {
              sourceType: 'module',
              sourceFilename: filePath,
            })

            const exportedKeys: string[] = ast.program.body
              .filter(node => node.type === 'ExportNamedDeclaration')
              // @ts-expect-error parse return any
              .flatMap(node => node.specifiers.map(specifier => specifier.exported.name))
              .filter((key: string) => /^[A-Z]/.test(key))

            exportedKeys.forEach((key) => {
              addComponent({
                name: `${prefix}${key}`, // name of the component to be used in vue templates
                export: key, // (optional) if the component is a named (rather than default) export
                filePath: resolve(filePath),
              })
            })
          }
          catch (error) {
            if (error instanceof Error) {
              console.warn('Module error: ', error.message)
            }
          }
        })
    }
    catch (error) {
      if (error instanceof Error) {
        console.warn(error.message)
      }
    }
  },
})
