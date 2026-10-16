import type { ChartConfig } from './chart-types';

export function defaultColors(count: number = 3) {
  return Array.from({ length: count }, (_, index) => `var(--chart-${(index % 5) + 1})`);
}

export function colorsFromConfig(categories: string[], config?: ChartConfig, colors?: string[]) {
  if (colors?.length) {
    return colors;
  }

  if (!config) {
    return defaultColors(categories.length);
  }

  return categories.map((category, index) => {
    const series = config[category];

    return series?.color ?? series?.theme?.light ?? `var(--chart-${(index % 5) + 1})`;
  });
}
