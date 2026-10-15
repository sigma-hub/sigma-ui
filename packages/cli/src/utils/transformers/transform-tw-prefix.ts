import { splitClassName } from './split-class-name';

export function applyPrefix(input: string, prefix: string = '') {
  const classNames = input.split(' ');
  const prefixed: string[] = [];

  for (const className of classNames) {
    const [variant, value, modifier] = splitClassName(className);

    if (variant) {
      modifier
        ? prefixed.push(`${variant}:${prefix}${value}/${modifier}`)
        : prefixed.push(`${variant}:${prefix}${value}`);
    } else {
      modifier
        ? prefixed.push(`${prefix}${value}/${modifier}`)
        : prefixed.push(`${prefix}${value}`);
    }
  }

  return prefixed.join(' ');
}

export function applyPrefixesCss(css: string, prefix: string) {
  const lines = css.split('\n');

  for (const line of lines) {
    if (line.includes('@apply')) {
      const originalTWCls = line.replace('@apply', '').trim();
      const prefixedTwCls = applyPrefix(originalTWCls, prefix);
      css = css.replace(originalTWCls, prefixedTwCls);
    }
  }

  return css;
}
