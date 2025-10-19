---
title: Line
description: A line chart  visually displays data points connected by straight lines, illustrating trends or relationships over a continuous axis.
source: packages/lib/src/registry/tailwind/ui/chart-line
label: Alpha
---

<ComponentPreview name="LineChart"  />

## Installation

<Callout>
  Requires Vue >= 3.3
</Callout>

<Steps>

### Run the following command

```bash
npx sigma-ui add chart card chart-line
```

### Setup

Follow the [guide](/components/charts.html#installation) to complete the setup.

</Steps>

## API

<!-- @include: @/content/meta/LineChart.md -->

## Examples

### Sparkline

We can turn the chart into sparkline chart by hiding axis, gridline and legends.

<ComponentPreview name="LineChartSparkline"  />

### Custom Tooltip

If you want to render custom tooltip, you can easily pass in a custom component. Refer to prop definition [here](/components/charts.html#custom-tooltip).

<ComponentPreview name="LineChartCustomTooltip"  />
