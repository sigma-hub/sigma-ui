import type * as z from 'zod';
import MagicString from 'magic-string';
import type { SFCTemplateBlock } from '@vue/compiler-sfc';
import { parse } from '@vue/compiler-sfc';
import { SyntaxKind } from 'ts-morph';
import type { registryBaseColorSchema } from '@/src/schemas';
import type { Transformer } from '@/src/utils/transformers';

export const transformCssVars: Transformer = async ({
  sourceFile,
  config,
  baseColor,
}) => {
  const isVueFile = sourceFile.getFilePath().endsWith('vue');

  // No transform if using css variables.
  if (config.tailwind?.cssVariables || !baseColor?.inlineColors) {
    return sourceFile;
  }

  let template: SFCTemplateBlock | null = null;

  if (isVueFile) {
    const parsed = parse(sourceFile.getText());
    template = parsed.descriptor.template;

    if (!template) {
      return sourceFile;
    }
  }

  sourceFile.getDescendantsOfKind(SyntaxKind.StringLiteral).forEach((node) => {
    if (template && template.loc.start.offset >= node.getPos()) {
      return sourceFile;
    }

    const value = node.getText();

    const hasClosingDoubleQuote = value.match(/"/g)?.length === 2;

    if (value.search('\'') === -1 && hasClosingDoubleQuote) {
      const mapped = applyColorMapping(value.replace(/"/g, ''), baseColor.inlineColors);
      node.replaceWithText(`"${mapped}"`);
    } else {
      const s = new MagicString(value);
      s.replace(/'(.*?)'/g, (substring) => {
        return `'${applyColorMapping(substring.replace(/'/g, ''), baseColor.inlineColors)}'`;
      });
      node.replaceWithText(s.toString());
    }
  });

  return sourceFile;
};

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
