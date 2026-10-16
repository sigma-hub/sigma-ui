import { z } from 'zod';
import { registryItemTypeSchema } from '@sigma-ui/shared/schemas';
import type { RegistryConfigEntry, RegistryItem } from '@/src/schemas';
import { getRawConfig } from '@/src/utils/get-config';
import { fetchRegistryIndex, fetchRegistryItem, getDefaultRegistryBase, searchRegistryItems } from '@/src/utils/registry';
import { getRegistryContext } from '@/src/utils/registry-context';

export const TOOL_NAMES = [
  'get_project_registries',
  'list_items_in_registries',
  'search_items_in_registries',
  'view_items_in_registries',
  'get_item_examples_from_registries',
  'get_add_command_for_items',
  'get_audit_checklist',
] as const;

export type ToolName = (typeof TOOL_NAMES)[number];

const EXAMPLE_LIMIT = 5;
const DEFAULT_LIST_LIMIT = 100;
const SHELL_SAFE_ITEM = /^[\w@./:-]+$/;
const DEFAULT_REGISTRY_NAMES = new Set(['sigma-ui', 'default']);

const AUDIT_CHECKLIST = [
  'Audit the installed sigma-ui code before shipping:',
  '',
  '1. Imports match the installed files. Named exports come from the component file, for example `import { Button } from \'@/components/ui/button\'`, and default exports stay default imports.',
  '2. Every registry dependency of the item is installed. Run `npx sigma-ui add <item>` again when a component is missing.',
  '3. Component directories stay kebab-case (`components/ui/dropdown-menu`), including when componentNaming is pascal-case.',
  '4. CSS style-system blocks keep the block prefix on every static class, including classes written inside :class strings.',
  '5. Run the project typecheck and lint. Registry files are Vue single-file components, so check the script and the template.',
].join('\n');

export interface McpToolResult {
  content: Array<{ type: 'text'; text: string }>;
  isError?: boolean;
}

export interface ToolDefinition {
  name: ToolName;
  description: string;
  inputSchema: Record<string, unknown>;
}

const registriesProperty = {
  type: 'array',
  items: { type: 'string' },
  description: 'Registry namespaces such as @acme. Omit to use the default sigma-ui registry and every configured namespace. "sigma-ui" selects the default registry.',
};

const typesProperty = {
  type: 'array',
  items: { type: 'string' },
  description: 'Item types, with or without the registry: prefix. Examples: ui, block, example.',
};

const limitProperty = {
  type: 'integer',
  minimum: 0,
  description: 'Maximum items to return per registry. Defaults to 100. Use 0 for no limit.',
};

const offsetProperty = {
  type: 'integer',
  minimum: 0,
  description: 'Number of matching items to skip in each registry. Defaults to 0.',
};

const itemsProperty = {
  type: 'array',
  items: { type: 'string' },
  description: 'Registry item names. Use @namespace/name for a configured registry, or a full item URL.',
};

function objectSchema(properties: Record<string, unknown>, required: string[] = []) {
  return {
    type: 'object',
    properties,
    required,
    additionalProperties: false,
  };
}

export const TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    name: 'get_project_registries',
    description: 'List the default sigma-ui registry and the registries configured in sigma-ui.config.json.',
    inputSchema: objectSchema({}),
  },
  {
    name: 'list_items_in_registries',
    description: 'List registry items. A registry that cannot be read is skipped and reported.',
    inputSchema: objectSchema({
      registries: registriesProperty,
      types: typesProperty,
      limit: limitProperty,
      offset: offsetProperty,
    }),
  },
  {
    name: 'search_items_in_registries',
    description: 'Search item names, titles, descriptions, and categories. A registry that cannot be read is skipped and reported.',
    inputSchema: objectSchema({
      query: { type: 'string', description: 'Words to match. Every word must appear in the item name, title, description, or categories.' },
      registries: registriesProperty,
      types: typesProperty,
      limit: limitProperty,
      offset: offsetProperty,
    }, ['query']),
  },
  {
    name: 'view_items_in_registries',
    description: 'Fetch full registry items, including file contents, dependencies, and registry dependencies.',
    inputSchema: objectSchema({ items: itemsProperty }, ['items']),
  },
  {
    name: 'get_item_examples_from_registries',
    description: 'Find example and demo items and return their source. At most 5 items are returned.',
    inputSchema: objectSchema({
      query: { type: 'string', description: 'Optional words matched against example and demo items.' },
      registries: registriesProperty,
    }),
  },
  {
    name: 'get_add_command_for_items',
    description: 'Return the npx sigma-ui add command for the given items.',
    inputSchema: objectSchema({ items: itemsProperty }, ['items']),
  },
  {
    name: 'get_audit_checklist',
    description: 'Return a Vue-oriented checklist for reviewing code installed from the registry.',
    inputSchema: objectSchema({}),
  },
];

const listArgsSchema = z.object({
  registries: z.array(z.string().min(1)).optional(),
  types: z.array(z.string().min(1)).optional(),
  limit: z.number().int().nonnegative().optional(),
  offset: z.number().int().nonnegative().optional(),
});

const searchArgsSchema = listArgsSchema.extend({
  query: z.string().min(1),
});

const namedItemsSchema = z.object({
  items: z.array(z.string().min(1)).min(1),
});

const examplesArgsSchema = z.object({
  query: z.string().optional(),
  registries: z.array(z.string().min(1)).optional(),
});

interface ListedItem {
  name: string;
  type: string;
  title?: string;
  description?: string;
}

interface ListedRegistry {
  registry: string;
  total: number;
  items: ListedItem[];
}

interface SkippedRegistry {
  registry: string;
  error: string;
}

export function isToolName(value: string): value is ToolName {
  return (TOOL_NAMES as readonly string[]).includes(value);
}

export async function dispatchToolCall(params: unknown, cwd: string): Promise<McpToolResult> {
  const parsed = z.object({
    name: z.string(),
    arguments: z.unknown().optional(),
  }).safeParse(params ?? {});

  if (!parsed.success) {
    return invalidArguments(parsed.error);
  }

  if (!isToolName(parsed.data.name)) {
    return textResult(`Unknown tool "${parsed.data.name}". Available tools: ${TOOL_NAMES.join(', ')}.`, true);
  }

  try {
    return await callTool(parsed.data.name, parsed.data.arguments ?? {}, cwd);
  } catch (error) {
    return textResult(errorMessage(error), true);
  }
}

async function callTool(name: ToolName, args: unknown, cwd: string): Promise<McpToolResult> {
  const input = objectArguments(args);

  if (!input.ok) {
    return input.result;
  }

  switch (name) {
    case 'get_project_registries':
      return getProjectRegistries(cwd);
    case 'list_items_in_registries':
      return listItems(input.value, cwd);
    case 'search_items_in_registries':
      return searchItems(input.value, cwd);
    case 'view_items_in_registries':
      return viewItems(input.value, cwd);
    case 'get_item_examples_from_registries':
      return getExamples(input.value, cwd);
    case 'get_add_command_for_items':
      return getAddCommand(input.value);
    case 'get_audit_checklist':
      return textResult(AUDIT_CHECKLIST);

    default: {
      const unexpected: never = name;
      return textResult(`Unhandled tool ${unexpected}`, true);
    }
  }
}

async function getProjectRegistries(cwd: string): Promise<McpToolResult> {
  const config = await getRawConfig(cwd);
  const registries = [
    { name: 'sigma-ui', url: getDefaultRegistryBase() },
    ...Object.entries(config?.registries ?? {}).map(([name, entry]) => ({
      name,
      url: registryEntryUrl(entry),
    })),
  ];

  if (!config) {
    return jsonResult({
      configured: false,
      message: 'No sigma-ui.config.json was found. The default registry is still available. Run `npx sigma-ui init` to create a project config.',
      registries,
    });
  }

  return jsonResult({
    configured: true,
    styleSystem: config.styleSystem,
    registries,
  });
}

async function listItems(args: unknown, cwd: string) {
  const parsed = listArgsSchema.safeParse(args);

  if (!parsed.success) {
    return invalidArguments(parsed.error);
  }

  return queryRegistries(cwd, {
    ...parsed.data,
    limit: parsed.data.limit ?? DEFAULT_LIST_LIMIT,
    offset: parsed.data.offset ?? 0,
  });
}

async function searchItems(args: unknown, cwd: string) {
  const parsed = searchArgsSchema.safeParse(args);

  if (!parsed.success) {
    return invalidArguments(parsed.error);
  }

  return queryRegistries(cwd, {
    ...parsed.data,
    limit: parsed.data.limit ?? DEFAULT_LIST_LIMIT,
    offset: parsed.data.offset ?? 0,
  });
}

async function queryRegistries(cwd: string, options: {
  registries?: string[];
  types?: string[];
  query?: string;
  limit: number;
  offset: number;
}) {
  const resolvedTypes = resolveTypes(options.types);

  if (!resolvedTypes.ok) {
    return textResult(resolvedTypes.message, true);
  }

  const context = await getRegistryContext(cwd);
  const namespaces = await resolveNamespaces(cwd, options.registries);
  const registries: ListedRegistry[] = [];
  const skipped: SkippedRegistry[] = [];

  for (const namespace of namespaces) {
    try {
      const index = await fetchRegistryIndex(namespace, context);
      const matches = matchItems(index.items, options.query, resolvedTypes.types);
      registries.push({
        registry: namespace ?? index.name,
        total: matches.length,
        items: pageItems(matches, options.limit, options.offset).map(summarizeItem),
      });
    } catch (error) {
      skipped.push({ registry: namespace ?? 'sigma-ui', error: errorMessage(error) });
    }
  }

  return jsonResult({ registries, skipped }, registries.length === 0 && skipped.length > 0);
}

async function viewItems(args: unknown, cwd: string) {
  const parsed = namedItemsSchema.safeParse(args);

  if (!parsed.success) {
    return invalidArguments(parsed.error);
  }

  const context = await getRegistryContext(cwd);
  const items = [];
  const errors = [];

  for (const specifier of parsed.data.items) {
    try {
      const { item } = await fetchRegistryItem(specifier, context);
      items.push(describeItem(item));
    } catch (error) {
      errors.push({ item: specifier, error: errorMessage(error) });
    }
  }

  return jsonResult({ items, errors }, items.length === 0);
}

async function getExamples(args: unknown, cwd: string) {
  const parsed = examplesArgsSchema.safeParse(args);

  if (!parsed.success) {
    return invalidArguments(parsed.error);
  }

  const context = await getRegistryContext(cwd);
  const namespaces = await resolveNamespaces(cwd, parsed.data.registries);
  const candidates: Array<{ namespace: string | null; registry: string; item: RegistryItem }> = [];
  const skipped: SkippedRegistry[] = [];

  for (const namespace of namespaces) {
    try {
      const index = await fetchRegistryIndex(namespace, context);
      const matches = searchRegistryItems(index.items, { query: parsed.data.query })
        .filter(isExampleItem);

      for (const item of matches) {
        candidates.push({ namespace, registry: namespace ?? index.name, item });
      }
    } catch (error) {
      skipped.push({ registry: namespace ?? 'sigma-ui', error: errorMessage(error) });
    }
  }

  const items = [];

  for (const candidate of candidates.slice(0, EXAMPLE_LIMIT)) {
    const specifier = candidate.namespace ? `${candidate.namespace}/${candidate.item.name}` : candidate.item.name;

    try {
      const { item } = await fetchRegistryItem(specifier, context);
      items.push({ registry: candidate.registry, ...describeItem(item) });
    } catch (error) {
      skipped.push({ registry: `${candidate.registry}/${candidate.item.name}`, error: errorMessage(error) });
    }
  }

  return jsonResult({
    items,
    skipped,
    limit: EXAMPLE_LIMIT,
  });
}

function getAddCommand(args: unknown) {
  const parsed = namedItemsSchema.safeParse(args);

  if (!parsed.success) {
    return invalidArguments(parsed.error);
  }

  const formatted = parsed.data.items.map(shellQuote);

  return textResult(`npx sigma-ui add ${formatted.join(' ')}`);
}

function shellQuote(item: string) {
  if (SHELL_SAFE_ITEM.test(item)) {
    return item;
  }

  return `'${item.replaceAll('\'', `'\\''`)}'`;
}

function resolveTypes(types: string[] | undefined): { ok: true; types: string[] | null } | { ok: false; message: string } {
  if (!types?.length) {
    return { ok: true, types: null };
  }

  const normalized = types.map(type => (type.startsWith('registry:') ? type : `registry:${type}`));
  const unknown = normalized.filter(type => !registryItemTypeSchema.safeParse(type).success);

  if (unknown.length) {
    return {
      ok: false,
      message: `Unknown item type: ${unknown.join(', ')}. Allowed types: ${registryItemTypeSchema.options.join(', ')}.`,
    };
  }

  return { ok: true, types: normalized };
}

function matchItems(items: RegistryItem[], query: string | undefined, types: string[] | null) {
  if (!types) {
    return searchRegistryItems(items, { query });
  }

  const seen = new Set<string>();
  const matches: RegistryItem[] = [];

  for (const type of types) {
    for (const item of searchRegistryItems(items, { query, type })) {
      if (seen.has(item.name)) {
        continue;
      }

      seen.add(item.name);
      matches.push(item);
    }
  }

  return matches;
}

async function resolveNamespaces(cwd: string, registries: string[] | undefined) {
  if (registries?.length) {
    return uniqueNamespaces(registries.map(registry => (DEFAULT_REGISTRY_NAMES.has(registry) ? null : registry)));
  }

  const config = await getRawConfig(cwd);
  return uniqueNamespaces([null, ...Object.keys(config?.registries ?? {})]);
}

function uniqueNamespaces(namespaces: Array<string | null>) {
  const seen = new Set<string>();
  const unique: Array<string | null> = [];

  for (const namespace of namespaces) {
    const key = namespace ?? '';

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    unique.push(namespace);
  }

  return unique;
}

function pageItems<T>(items: T[], limit: number, offset: number) {
  if (limit === 0) {
    return items.slice(offset);
  }

  return items.slice(offset, offset + limit);
}

function summarizeItem(item: RegistryItem): ListedItem {
  return {
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
  };
}

function describeItem(item: RegistryItem) {
  return {
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies ?? [],
    devDependencies: item.devDependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
    files: (item.files ?? []).map(file => ({
      path: file.path,
      type: file.type,
      content: file.content ?? '',
    })),
  };
}

function isExampleItem(item: RegistryItem) {
  return item.type === 'registry:example' || /(?:demo|example)/i.test(item.name);
}

function registryEntryUrl(entry: RegistryConfigEntry) {
  return typeof entry === 'string' ? entry : entry.url;
}

function objectArguments(args: unknown): { ok: true; value: unknown } | { ok: false; result: McpToolResult } {
  if (args === undefined || args === null) {
    return { ok: true, value: {} };
  }

  if (typeof args !== 'object' || Array.isArray(args)) {
    return { ok: false, result: textResult('Tool arguments must be an object.', true) };
  }

  return { ok: true, value: args };
}

function invalidArguments(error: z.ZodError) {
  return textResult(error.issues.map(issue => `${issue.path.join('.') || 'arguments'}: ${issue.message}`).join('; '), true);
}

function textResult(text: string, isError = false): McpToolResult {
  return isError
    ? { content: [{ type: 'text', text }], isError: true }
    : { content: [{ type: 'text', text }] };
}

function jsonResult(value: unknown, isError = false) {
  return textResult(JSON.stringify(value, null, 2), isError);
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}
