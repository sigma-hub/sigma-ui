---
title: Line
description: A line chart connects values along a continuous axis to show a trend.
source: chart-line
label: Alpha
---

## Preview

<ComponentPreview name="LineChart" />

## Installation

<ComponentInstall name="chart-line" />

### Setup

Charts need the Unovis color variables from the [Charts installation](/components/charts#installation).

## Usage

```vue
<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line';

const data = [
  { name: 'Jan', total: 1200, predicted: 900 },
  { name: 'Feb', total: 1600, predicted: 1100 },
];
</script>

<template>
  <LineChart
    :data="data"
    index="name"
    :categories="['total', 'predicted']"
  />
</template>
```

`index` is the property used for the x axis. `categories` lists the series to plot.

## Examples

### Sparkline

Hide the axes, grid, and legend to render a sparkline.

<ComponentPreview name="LineChartSparkline" />

### Custom tooltip

Pass a component to `customTooltip`. It receives `title` and `data`. See the [Charts](/components/charts#custom-tooltip) page for the prop shape.

<ComponentPreview name="LineChartCustomTooltip" />

## API Reference

<!-- @include: @/content/meta/chart-line.md -->

## Accessibility

The chart is an SVG graphic. Hovering a point shows a tooltip. Give the surrounding section a heading or caption that states what the chart measures, and provide the same numbers in a table when the exact values matter.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus past the chart. Points are not individually focusable. |
