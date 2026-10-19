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
