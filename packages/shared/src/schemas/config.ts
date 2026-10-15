import { z } from 'zod';

export const CONFIG_SCHEMA_URL = 'https://sigma-ui.dev/schema.json';
export const DEFAULT_TYPESCRIPT_CONFIG = 'tsconfig.json';
export const DEFAULT_BASE_COLOR = 'grayscale';

export const styleSystemSchema = z.enum(['tailwind', 'css']);
export const frameworkSchema = z.enum(['vite', 'nuxt', 'laravel', 'astro']);
export const componentNamingSchema = z.enum(['pascal-case', 'kebab-case']).default('pascal-case');

export type ComponentNaming = z.infer<typeof componentNamingSchema>;
export type Framework = z.infer<typeof frameworkSchema>;

export const registryNamespaceSchema = z.string().regex(/^@[\w-]+$/, 'Registry namespaces must look like @name');

const registryUrlSchema = z.string()
  .refine(url => url.includes('{name}'), 'Registry URLs must contain the {name} placeholder')
  .describe('URL or path template for registry items. {name} is replaced with the item name and {style} with the style system. ${ENV_VAR} placeholders are expanded.');

export const registryConfigEntrySchema = z.union([
  registryUrlSchema,
  z.object({
    url: registryUrlSchema,
    params: z.record(z.string(), z.string()).optional().describe('Query parameters appended to the URL.'),
    headers: z.record(z.string(), z.string()).optional().describe('Request headers, e.g. Authorization: Bearer ${TOKEN}.'),
  }),
]);

export type RegistryConfigEntry = z.infer<typeof registryConfigEntrySchema>;

export const rawConfigSchema = z.object({
  $schema: z.string().optional(),
  styleSystem: styleSystemSchema.describe('Install components styled with Tailwind utilities or with plain scoped CSS.'),
  framework: frameworkSchema.default('vite'),
  tsConfigPath: z.string().default(DEFAULT_TYPESCRIPT_CONFIG).describe('tsconfig used to resolve path aliases.'),
  setupTailwind: z.boolean().default(false).describe('Whether init set up Tailwind CSS for this project.'),
  cssPath: z.string().describe('Stylesheet that holds the theme variables, relative to the project root.'),
  baseColor: z.string().default(DEFAULT_BASE_COLOR).describe('Theme base color.'),
  tailwind: z.object({
    config: z.string().default('').describe('Optional legacy tailwind.config.js referenced with @config. Leave empty for CSS-first Tailwind v4.'),
    prefix: z.string().optional().describe('Prefix added to Tailwind utility classes.'),
  }).default({}),
  aliases: z.object({
    components: z.string().describe('Import alias for UI components, e.g. @/components/ui.'),
    utils: z.string().default('').describe('Import alias for the cn() helper, e.g. @/lib/utils. Empty for the CSS style system.'),
    blocks: z.string().optional().describe('Import alias for blocks. Defaults to a blocks folder next to the components folder.'),
    lib: z.string().optional().describe('Import alias for registry:lib files. Defaults to the folder of utils.'),
    composables: z.string().optional().describe('Import alias for composables. Defaults to <source root>/composables.'),
  }),
  generatePreflight: z.boolean().default(true).describe('Write a preflight.css reset for the CSS style system.'),
  componentNaming: componentNamingSchema.describe('File naming for installed components. Directories are always kebab-case.'),
  registries: z.record(registryNamespaceSchema, registryConfigEntrySchema).optional()
    .describe('Third-party registries, installed with sigma-ui add @namespace/item.'),
});

export type RawConfig = z.infer<typeof rawConfigSchema>;
export type RawConfigInput = z.input<typeof rawConfigSchema>;
