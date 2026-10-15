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

export const registryConfigEntrySchema = z.union([
  z.string().refine(url => url.includes('{name}'), 'Registry URLs must contain the {name} placeholder'),
  z.object({
    url: z.string().refine(url => url.includes('{name}'), 'Registry URLs must contain the {name} placeholder'),
    params: z.record(z.string(), z.string()).optional(),
    headers: z.record(z.string(), z.string()).optional(),
  }),
]);

export type RegistryConfigEntry = z.infer<typeof registryConfigEntrySchema>;

export const rawConfigSchema = z.object({
  $schema: z.string().optional(),
  styleSystem: styleSystemSchema,
  framework: frameworkSchema.default('vite'),
  tsConfigPath: z.string().default(DEFAULT_TYPESCRIPT_CONFIG),
  setupTailwind: z.boolean().default(false),
  cssPath: z.string(),
  baseColor: z.string().default(DEFAULT_BASE_COLOR),
  tailwind: z.object({
    config: z.string().default(''),
    prefix: z.string().optional(),
  }).default({}),
  aliases: z.object({
    components: z.string(),
    utils: z.string().default(''),
    blocks: z.string().optional(),
    lib: z.string().optional(),
    composables: z.string().optional(),
  }),
  generatePreflight: z.boolean().default(true),
  componentNaming: componentNamingSchema,
  registries: z.record(registryNamespaceSchema, registryConfigEntrySchema).optional(),
});

export type RawConfig = z.infer<typeof rawConfigSchema>;
export type RawConfigInput = z.input<typeof rawConfigSchema>;
