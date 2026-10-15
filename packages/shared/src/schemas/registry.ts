import { z } from 'zod';

export const REGISTRY_ITEM_SCHEMA_URL = 'https://ui.shadcn.com/schema/registry-item.json';
export const REGISTRY_SCHEMA_URL = 'https://ui.shadcn.com/schema/registry.json';

export const registryItemTypeSchema = z.enum([
  'registry:ui',
  'registry:block',
  'registry:component',
  'registry:lib',
  'registry:composable',
  'registry:hook',
  'registry:page',
  'registry:file',
  'registry:theme',
  'registry:style',
  'registry:item',
  'registry:example',
  'registry:internal',
]);

export type RegistryItemType = z.infer<typeof registryItemTypeSchema>;

export const registryItemFileSchema = z.object({
  path: z.string(),
  content: z.string().optional(),
  type: registryItemTypeSchema,
  target: z.string().optional(),
});

export type RegistryItemFile = z.infer<typeof registryItemFileSchema>;

const cssVarsRecordSchema = z.record(z.string(), z.string());

export const registryItemCssVarsSchema = z.object({
  theme: cssVarsRecordSchema.optional(),
  light: cssVarsRecordSchema.optional(),
  dark: cssVarsRecordSchema.optional(),
});

export const registryItemSchema = z.object({
  $schema: z.string().optional(),
  extends: z.string().optional(),
  name: z.string(),
  type: registryItemTypeSchema,
  title: z.string().optional(),
  author: z.string().optional(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(registryItemFileSchema).optional(),
  cssVars: registryItemCssVarsSchema.optional(),
  css: z.record(z.string(), z.unknown()).optional(),
  envVars: z.record(z.string(), z.string()).optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
  docs: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

export type RegistryItem = z.infer<typeof registryItemSchema>;

export const registrySchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  homepage: z.string().optional(),
  items: z.array(registryItemSchema),
});

export type Registry = z.infer<typeof registrySchema>;
