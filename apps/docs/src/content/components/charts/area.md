---
title: Area
description: An area chart visually represents data over time, displaying trends and patterns through filled-in areas under a line graph.
source: apps/docs/src/lib/registry/tailwind/ui/chart-area
label: Alpha
---

<ComponentPreview name="AreaChart"  />

## Installation

<Callout>
  Requires Vue >= 3.3
</Callout>

<Steps>

### Run the following command

```bash
npx sigma-ui add chart card chart-area
```

### Setup

Follow the [guide](/components/charts.html#installation) to complete the setup.

</Steps>

## API

<!-- @include: @/content/meta/AreaChart.md -->

## Examples

### Sparkline

We can turn the chart into sparkline chart by hiding axis, gridline and legends.

<ComponentPreview name="AreaChartSparkline"  />

### Custom Tooltip

If you want to render custom tooltip, you can easily pass in a custom component. Refer to prop definition [here](/components/charts.html#custom-tooltip).

<ComponentPreview name="AreaChartCustomTooltip"  />
