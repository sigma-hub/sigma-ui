import type * as z from 'zod';
import type { registryBaseColorSchema } from '@/src/schemas';

// Splits a className into variant-name-alpha.
// eg. hover:bg-primary-100 -> [hover, bg-primary, 100]
export function splitClassName(className: string): (string | null)[] {
  if (!className.includes('/') && !className.includes(':')) {
    return [null, className, null];
  }

  const parts: (string | null)[] = [];
  const [rest, alpha] = className.split('/');

  if (!rest.includes(':')) {
    return [null, rest, alpha];
  }

  const split = rest.split(':');
  const name = split.pop();
  const variant = split.join(':');

  parts.push(variant ?? null, name ?? null, alpha ?? null);

  return parts;
}

const PREFIXES = ['bg-', 'text-', 'border-', 'ring-offset-', 'ring-'];

export function applyColorMapping(
  input: string,
  mapping: z.infer<typeof registryBaseColorSchema>['inlineColors'],
) {
  // Handle border classes
  if (input.includes(' border ')) {
    input = input.replace(' border ', ' border border-border ');
  }

  const classNames = input.split(' ');
  const lightMode = new Set<string>();
  const darkMode = new Set<string>();

  for (const className of classNames) {
    const [variant, value, modifier] = splitClassName(className);
    const prefix = PREFIXES.find(prefix => value?.startsWith(prefix));

    if (!prefix) {
      if (!lightMode.has(className)) {
        lightMode.add(className);
      }

      continue;
    }

    const needle = value?.replace(prefix, '');

    if (needle && needle in mapping.light) {
      lightMode.add(
        [variant, `${prefix}${mapping.light[needle]}`]
          .filter(Boolean)
          .join(':') + (modifier ? `/${modifier}` : ''),
      );

      darkMode.add(
        ['dark', variant, `${prefix}${mapping.dark[needle]}`]
          .filter(Boolean)
          .join(':') + (modifier ? `/${modifier}` : ''),
      );
      continue;
    }

    if (!lightMode.has(className)) {
      lightMode.add(className);
    }
  }

  return [...Array.from(lightMode), ...Array.from(darkMode)].join(' ').trim();
}
