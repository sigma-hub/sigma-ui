<script setup lang="ts">
import { VisTooltip } from '@unovis/vue';
import type { BulletLegendItemInterface } from '@unovis/ts';
import type { Component } from 'vue';
import { ChartTooltip } from '.';
import { createChartSingleTooltipTemplate } from '@ui/registry/shared/ui/chart/tooltip-template';

const props = withDefaults(defineProps<{
  /** CSS selector of the chart elements that show the tooltip on hover. */
  selector: string;
  /** Data key used as the tooltip title. */
  index: string;
  /** Legend items used to look up the name and color of each value. */
  items?: BulletLegendItemInterface[];
  /** Formats each value before it is shown. */
  valueFormatter?: (tick: number, i?: number, ticks?: number[]) => string;
  /** Component rendered instead of ChartTooltip; receives title and data props. */
  customTooltip?: Component;
}>(), {
  valueFormatter: (tick: number) => `${tick}`,
});

const template = createChartSingleTooltipTemplate(props, ChartTooltip);
</script>

<template>
  <VisTooltip
    :horizontal-shift="20"
    :vertical-shift="20"
    :triggers="{
      [selector]: template,
    }"
    data-slot="chart-single-tooltip"
  />
</template>
