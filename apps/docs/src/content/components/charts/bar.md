---
title: Bar
description: A bar chart compares quantities across categories with rectangular bars.
source: chart-bar
label: Alpha
---

## Preview

<ComponentPreview name="BarChart" />

## Installation

<ComponentInstall name="chart-bar" />

### Setup

Charts need the Unovis color variables from the [Charts installation](/components/charts#installation).

## Usage

```vue
<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';

const data = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 1600 },
];
</script>

<template>
  <BarChart
    :data="data"
    index="name"
    :categories="['total']"
  />
</template>
```

Set `type` to `stacked` to stack the series. `roundedCorners` rounds the bar corners, in pixels.

## Examples

### Stacked

<ComponentPreview name="BarChartStacked" />

### Rounded

<ComponentPreview name="BarChartRounded" />

### Custom tooltip

Pass a component to `customTooltip`. It receives `title` and `data`. See the [Charts](/components/charts#custom-tooltip) page for the prop shape.

<ComponentPreview name="BarChartCustomTooltip" />

## API Reference

<!-- @include: @/content/meta/chart-bar.md -->

## Accessibility

The chart is an SVG graphic. Hovering a bar shows a tooltip. Give the surrounding section a heading or caption that states what the chart measures, and provide the same numbers in a table when the exact values matter.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus past the chart. Bars are not individually focusable. |
