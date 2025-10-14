import { z } from 'zod';

export const DEFAULT_TYPESCRIPT_CONFIG = 'tsconfig.json';
export const DEFAULT_TAILWIND_BASE_COLOR = 'grayscale';

// Common field schemas
// These are reusable field definitions that can be composed into larger schemas
export const commonFields = {
  styleSystem: z.string(),
  baseColor: z.string().default(DEFAULT_TAILWIND_BASE_COLOR),
  components: z.array(z.string()).optional(),
  cwd: z.string(),
  yes: z.boolean(),
  path: z.string().optional(),
};

export const tailwindFields = {
  config: z.string(),
  prefix: z.string().optional(),
};

export const registryItemSchema = z.object({
  name: z.string(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(z.string()),
  type: z.enum(['components:ui', 'components:component', 'components:example']),
});

export const registryIndexSchema = z.array(registryItemSchema);

export const registryItemWithContentSchema = registryItemSchema.extend({
  files: z.array(
    z.object({
      name: z.string(),
      content: z.string(),
    }),
  ),
});

export const registryWithContentSchema = z.array(registryItemWithContentSchema);

export const stylesSchema = z.array(
  z.object({
    name: z.string(),
    label: z.string(),
  }),
);

export const registryBaseColorSchema = z.object({
  inlineColors: z.object({
    light: z.record(z.string(), z.string()),
    dark: z.record(z.string(), z.string()),
  }),
  cssVars: z.object({
    light: z.record(z.string(), z.string()),
    dark: z.record(z.string(), z.string()),
  }),
  templates: z.object({
    tailwind: z.object({
      withVariables: z.string(),
    }),
    css: z.object({
      withVariables: z.string(),
    }),
  }),
});

export const rawConfigSchema = z.object({
  $schema: z.string().optional(),
  styleSystem: commonFields.styleSystem,
  tsConfigPath: z.string().default(DEFAULT_TYPESCRIPT_CONFIG),
  setupTailwind: z.boolean().default(false),
  framework: z.string().default('vite'),
  cssPath: z.string(),
  baseColor: commonFields.baseColor,
  tailwind: z.object({
    config: tailwindFields.config,
    prefix: tailwindFields.prefix,
  }),
  aliases: z.object({
    utils: z.string().default(''),
    components: z.string(),
  }),
  generatePreflight: z.boolean().optional().default(true),
});

export type RawConfig = z.infer<typeof rawConfigSchema>;

export const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    tailwindConfig: z.string(),
    tailwindCss: z.string(),
    utils: z.string().optional(),
    components: z.string(),
  }),
});

export type Config = z.infer<typeof configSchema>;

export const initOptionsSchema = z.object({
  cwd: commonFields.cwd,
  yes: commonFields.yes,
});

export const addOptionsSchema = z.object({
  components: commonFields.components,
  yes: commonFields.yes,
  overwrite: z.boolean(),
  cwd: commonFields.cwd,
  all: z.boolean(),
  path: commonFields.path,
});

export const configValidationSchema = z.object({
  styleSystem: commonFields.styleSystem,
  baseColor: commonFields.baseColor,
  tailwind: z.object({
    config: tailwindFields.config,
  }),
});

export const diffOptionsSchema = z.object({
  component: z.string().optional(),
  yes: commonFields.yes,
  cwd: commonFields.cwd,
  path: commonFields.path,
});
