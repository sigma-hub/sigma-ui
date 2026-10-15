import { z } from 'zod';
import { rawConfigSchema } from '@sigma-ui/shared/schemas';

export {
  componentNamingSchema,
  rawConfigSchema,
  registryConfigEntrySchema,
  registryItemFileSchema,
  registryItemSchema,
  registrySchema,
  type ComponentNaming,
  type Framework,
  type RawConfig,
  type RawConfigInput,
  type Registry,
  type RegistryConfigEntry,
  type RegistryItem,
  type RegistryItemFile,
} from '@sigma-ui/shared/schemas';

export const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    cwd: z.string(),
    tailwindConfig: z.string(),
    tailwindCss: z.string(),
    utils: z.string(),
    components: z.string(),
    blocks: z.string(),
    lib: z.string(),
    composables: z.string(),
  }),
});

export type Config = z.infer<typeof configSchema>;

export const initOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
  defaults: z.boolean().default(false),
});

export const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  yes: z.boolean(),
  overwrite: z.boolean(),
  cwd: z.string(),
  all: z.boolean(),
  path: z.string().optional(),
  dryRun: z.boolean(),
  diff: z.boolean(),
});

export type AddOptions = z.infer<typeof addOptionsSchema>;
