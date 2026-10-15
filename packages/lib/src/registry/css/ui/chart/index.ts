import type { ChartConfig } from './interface';

export { default as ChartTooltip } from './ChartTooltip.vue';
export { default as ChartSingleTooltip } from './ChartSingleTooltip.vue';
export { default as ChartLegend } from './ChartLegend.vue';
export { default as ChartCrosshair } from './ChartCrosshair.vue';
export { default as ChartContainer } from './ChartContainer.vue';

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

export * from './interface';
