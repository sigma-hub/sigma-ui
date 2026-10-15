---
title: Donut
description: A donut chart shows parts of a whole as slices around an empty center.
source: chart-donut
label: Alpha
---

## Preview

<ComponentPreview name="DonutChart" />

## Installation

<ComponentInstall name="chart-donut" />

### Setup

Charts need the Unovis color variables from the [Charts installation](/components/charts#installation).

## Usage

```vue
<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart-donut';

const data = [
  { name: 'Direct', total: 400 },
  { name: 'Referral', total: 250 },
];
</script>

<template>
  <DonutChart
    :data="data"
    index="name"
    category="total"
  />
</template>
```

Set `type` to `pie` for a filled pie chart. Pass `colors` to override the generated palette.

## Examples

### Pie

<ComponentPreview name="DonutChartPie" />

### Color

<ComponentPreview name="DonutChartColor" />

### Custom tooltip

Pass a component to `customTooltip`. It receives `title` and `data`. See the [Charts](/components/charts#custom-tooltip) page for the prop shape.

<ComponentPreview name="DonutChartCustomTooltip" />

## API Reference

<!-- @include: @/content/meta/chart-donut.md -->

## Accessibility

The chart is an SVG graphic. The legend lists each slice. Give the surrounding section a heading that states what the chart measures, and do not rely on color alone to tell the slices apart.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus past the chart. Slices are not individually focusable. |
