---
title: Bar
description: A line chart visually represents data using rectangular bars of varying lengths to compare quantities across different categories or groups.
source: packages/lib/src/registry/tailwind/ui/chart-bar
label: Alpha
---

<ComponentPreview name="BarChart"  />

## Installation

<Callout>
  Requires Vue >= 3.3
</Callout>

<Steps>

### Run the following command

```bash
npx sigma-ui add chart card chart-bar
```

### Setup

Follow the [guide](/components/charts.html#installation) to complete the setup.

</Steps>

## API

<!-- @include: @/content/meta/BarChart.md -->

## Examples

### Stacked

You can stack the bar chart by settings prop `type` to `stacked`.

<ComponentPreview name="BarChartStacked"  />

### Rounded

<ComponentPreview name="BarChartRounded"  />

### Custom Tooltip

If you want to render custom tooltip, you can easily pass in a custom component. Refer to prop definition [here](/components/charts.html#custom-tooltip).

<ComponentPreview name="BarChartCustomTooltip"  />
