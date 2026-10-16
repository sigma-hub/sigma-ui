<script setup lang="ts">
import { VisCrosshair, VisTooltip } from '@unovis/vue';
import type { BulletLegendItemInterface } from '@unovis/ts';
import type { Component } from 'vue';
import { ChartTooltip } from '.';
import { createChartCrosshairBindings } from '@ui/registry/shared/ui/chart/tooltip-template';

const props = withDefaults(defineProps<{
  /** Crosshair point color for each series, in category order. */
  colors: string[];
  /** Data key used as the tooltip title. */
  index: string;
  /** Legend items used to look up the name and color of each value. */
  items: BulletLegendItemInterface[];
  /** Component rendered instead of ChartTooltip; receives title and data props. */
  customTooltip?: Component;
}>(), {
  colors: () => [],
});

const { template, color } = createChartCrosshairBindings(props, ChartTooltip);
</script>

<template>
  <VisTooltip
    :horizontal-shift="20"
    :vertical-shift="20"
    data-slot="chart-crosshair"
  />
  <VisCrosshair
    :template="template"
    :color="color"
    data-slot="chart-crosshair"
  />
</template>
