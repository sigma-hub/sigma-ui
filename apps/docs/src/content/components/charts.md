---
title: Charts
description: Versatile visualization tool, allowing users to represent data using various types of charts for effective analysis.
label: Beta
---

<script setup>
import { ChartAreaIcon, ChartColumnIcon, ChartLineIcon, ChartPieIcon } from '@lucide/vue'
</script>

## Chart type

<div class="grid gap-4 mt-8 sm:grid-cols-2 sm:gap-6 not-docs">
  <LinkedCard href="/components/charts/area">
    <ChartAreaIcon class="text-foreground/80 w-11 h-11" />
    <p class="mt-2 font-medium">Area</p>
  </LinkedCard>

  <LinkedCard href="/components/charts/line">
    <ChartLineIcon class="text-foreground/80 w-11 h-11" />
    <p class="mt-2 font-medium">Line</p>
  </LinkedCard>

  <LinkedCard href="/components/charts/bar">
    <ChartColumnIcon class="text-foreground/80 w-11 h-11" />
    <p class="mt-2 font-medium">Bar</p>
  </LinkedCard>

  <LinkedCard href="/components/charts/donut">
    <ChartPieIcon class="text-foreground/80 w-11 h-11" />
    <p class="mt-2 font-medium">Donut</p>
  </LinkedCard>
</div>

## Dependencies

`Charts` components is built on top of [Unovis](https://unovis.dev/) (a modular data visualization framework).

## Installation

<Callout>
  Requires Vue >= 3.3
</Callout>

<Steps>

### Update `css`

Add the following tooltip styling to your `tailwind.css` file:

```css
@layer base {
  :root {
    /* ... */
    --vis-tooltip-background-color: none !important;
    --vis-tooltip-border-color: none !important;
    --vis-tooltip-text-color: none !important;
    --vis-tooltip-shadow-color: none !important;
    --vis-tooltip-backdrop-filter: none !important;
    --vis-tooltip-padding: none !important;

    --vis-primary-color: var(--primary);
    /* change to any hsl value you want */
    --vis-secondary-color: 160 81% 40%;
    --vis-text-color: var(--muted-foreground);
  }
```

If you are not using `css-variables` for your component, you need to update the `--vis-primary-color` and `--vis-text-color` to your desired hsl values (use any "rgb to hsl" converter).

Be sure to provide `dark` mode styling as well.

</Steps>

## Colors

By default, we construct the primary theme color, and secondary (`--vis-secondary-color`) color with different opacity for the graph.

However, you can always pass in the desired `color` into each chart.

```vue
<template>
  <AreaChart
    :data="data"
    :colors="['blue', 'pink', 'orange', 'red']"
  />
</template>
```

## Custom tooltip

If you want to customize the `Tooltip` for the chart, you can pass `customTooltip` prop with a custom Vue component.
The custom component would receive `title` and `data` props, check out [ChartTooltip.vue component](https://github.com/sigma-hub/sigma-ui/tree/main/packages/lib/src/registry/tailwind/ui/chart/ChartTooltip.vue) for example.

The expected prop definition would be:

```ts
defineProps<{
  title?: string;
  data: {
    name: string;
    color: string;
    value: unknown;
  }[];
}>();
```

## API Reference

Parts shared by every chart:

<!-- @include: @/content/meta/chart.md -->

## Accessibility

Charts are SVG graphics. Hovering a point or bar shows a tooltip, and a donut chart lists each slice in a legend. Give the surrounding section a heading or caption that states what the chart measures. Provide the same numbers in a table when the exact values matter, and do not rely on color alone to tell series apart.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus past the chart. Points, bars, and slices are not individually focusable. |
