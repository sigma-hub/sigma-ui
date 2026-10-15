import type { RegistryItem } from '@/src/schemas';

export interface RegistrySearchOptions {
  query?: string;
  type?: string;
}

function normalizeType(type: string) {
  return type.startsWith('registry:') ? type : `registry:${type}`;
}

function getSearchableText(item: RegistryItem) {
  return [item.name, item.title, item.description, ...(item.categories ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export function searchRegistryItems(items: RegistryItem[], options: RegistrySearchOptions) {
  const terms = (options.query ?? '').toLowerCase().split(/\s+/).filter(Boolean);
  const type = options.type ? normalizeType(options.type) : null;

  return items.filter((item) => {
    if (type && item.type !== type) {
      return false;
    }

    const text = getSearchableText(item);
    return terms.every(term => text.includes(term));
  });
}
