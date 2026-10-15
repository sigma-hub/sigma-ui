import { z } from 'zod';
import { registryItemSchema, registrySchema, type Registry, type RegistryItem } from '@/src/schemas';
import { fetchRegistryJson } from './fetch';
import {
  resolveRegistryIndexLocation,
  resolveRegistryLocation,
  type RegistryContext,
  type RegistryLocation,
} from './location';

export * from './location';
export * from './fetch';
export * from './search';

export interface ResolvedRegistryItem {
  item: RegistryItem;
  location: RegistryLocation;
  requested: boolean;
}

function formatZodError(error: z.ZodError) {
  return error.issues.map(issue => `${issue.path.join('.') || 'item'}: ${issue.message}`).join('; ');
}

export async function fetchRegistryItem(specifier: string, context: RegistryContext) {
  const location = resolveRegistryLocation(specifier, context);
  const data = await fetchRegistryJson(location);
  const result = registryItemSchema.safeParse(data);

  if (!result.success) {
    throw new Error(`"${specifier}" is not a valid registry item (${location.source}): ${formatZodError(result.error)}`);
  }

  return { item: result.data, location };
}

export async function fetchRegistryIndex(namespace: string | null, context: RegistryContext): Promise<Registry> {
  const location = resolveRegistryIndexLocation(namespace, context);
  const data = await fetchRegistryJson(location);
  const result = registrySchema.safeParse(data);

  if (!result.success) {
    throw new Error(`The registry index at ${location.source} is invalid: ${formatZodError(result.error)}`);
  }

  return result.data;
}

export async function resolveRegistryTree(specifiers: string[], context: RegistryContext): Promise<ResolvedRegistryItem[]> {
  const resolved = new Map<string, ResolvedRegistryItem>();
  const requestedSpecifiers = new Set(specifiers);

  async function visit(specifier: string, ancestors: string[]) {
    const location = resolveRegistryLocation(specifier, context);

    if (resolved.has(location.source) || ancestors.includes(location.source)) {
      return;
    }

    const { item } = await fetchRegistryItem(specifier, context);

    for (const dependency of item.registryDependencies ?? []) {
      await visit(dependency, [...ancestors, location.source]);
    }

    if (!resolved.has(location.source)) {
      resolved.set(location.source, { item, location, requested: requestedSpecifiers.has(specifier) });
    }
  }

  for (const specifier of specifiers) {
    await visit(specifier, []);
  }

  return [...resolved.values()];
}
