import { existsSync } from 'node:fs';
import process from 'node:process';
import path from 'pathe';
import { REGISTRY_INDEX_NAME } from '@sigma-ui/shared/registry';
import type { RegistryConfigEntry } from '@/src/schemas';

export const DEFAULT_REGISTRY_URL = 'https://sigma-ui.dev/r';
export const REGISTRY_URL_ENV = 'SIGMA_UI_REGISTRY_URL';

export interface RegistryLocation {
  specifier: string;
  source: string;
  headers: Record<string, string>;
  namespace: string | null;
}

export interface RegistryContext {
  cwd: string;
  styleSystem: string;
  registries?: Record<string, RegistryConfigEntry>;
}

const NAMESPACED_ITEM_PATTERN = /^(@[\w-]+)\/(.+)$/;

export function isUrl(value: string) {
  return /^https?:\/\//.test(value);
}

export function isLocalRegistryFile(value: string, cwd: string) {
  return value.endsWith('.json') && (value.startsWith('.') || path.isAbsolute(value) || existsSync(path.resolve(cwd, value)));
}

export function expandEnvVars(value: string) {
  return value.replace(/\$\{(\w+)\}/g, (_placeholder, name: string) => process.env[name] ?? '');
}

export function getDefaultRegistryBase() {
  return (process.env[REGISTRY_URL_ENV] || DEFAULT_REGISTRY_URL).replace(/\/+$/, '');
}

function joinSource(base: string, ...segments: string[]) {
  if (isUrl(base)) {
    return [base, ...segments].join('/');
  }

  return path.resolve(base.replace(/^file:\/\//, ''), ...segments);
}

function fillTemplate(template: string, name: string, styleSystem: string) {
  return expandEnvVars(template)
    .replaceAll('{name}', name)
    .replaceAll('{style}', styleSystem);
}

function appendParams(source: string, params: Record<string, string> | undefined) {
  if (!params || !isUrl(source)) {
    return source;
  }

  const url = new URL(source);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, expandEnvVars(value));
  }

  return url.toString();
}

function resolveNamespacedLocation(specifier: string, namespace: string, name: string, context: RegistryContext): RegistryLocation {
  const entry = context.registries?.[namespace];

  if (!entry) {
    throw new Error(`Unknown registry namespace "${namespace}". Add it to "registries" in sigma-ui.config.json, e.g. "${namespace}": "https://example.com/r/{name}.json".`);
  }

  const { url, params, headers } = typeof entry === 'string' ? { url: entry, params: undefined, headers: undefined } : entry;
  const filled = fillTemplate(url, name, context.styleSystem);
  const source = isUrl(filled) ? appendParams(filled, params) : path.resolve(context.cwd, filled);

  return {
    specifier,
    source,
    namespace,
    headers: Object.fromEntries(Object.entries(headers ?? {}).map(([key, value]) => [key, expandEnvVars(value)])),
  };
}

export function resolveRegistryLocation(specifier: string, context: RegistryContext): RegistryLocation {
  if (isUrl(specifier)) {
    return { specifier, source: specifier, headers: {}, namespace: null };
  }

  if (isLocalRegistryFile(specifier, context.cwd)) {
    return { specifier, source: path.resolve(context.cwd, specifier), headers: {}, namespace: null };
  }

  const namespacedMatch = specifier.match(NAMESPACED_ITEM_PATTERN);

  if (namespacedMatch) {
    return resolveNamespacedLocation(specifier, namespacedMatch[1], namespacedMatch[2], context);
  }

  return {
    specifier,
    source: joinSource(getDefaultRegistryBase(), context.styleSystem, `${specifier}.json`),
    headers: {},
    namespace: null,
  };
}

export function resolveRegistryIndexLocation(namespace: string | null, context: RegistryContext) {
  const specifier = namespace ? `${namespace}/${REGISTRY_INDEX_NAME}` : REGISTRY_INDEX_NAME;
  return resolveRegistryLocation(specifier, context);
}
