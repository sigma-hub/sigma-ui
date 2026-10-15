<script setup lang="ts">
import { VisCrosshair, VisTooltip } from '@unovis/vue';
import type { BulletLegendItemInterface } from '@unovis/ts';
import { omit } from '@unovis/ts';
import { type Component, createApp } from 'vue';
import { ChartTooltip } from '.';

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

const wm = new WeakMap();

function template(d: any) {
  if (typeof document === 'undefined') {
    return '';
  }

  if (wm.has(d)) {
    return wm.get(d);
  } else {
    const componentDiv = document.createElement('div');
    const omittedData = Object.entries(omit(d, [props.index])).map(([key, value]) => {
      const legendReference = props.items.find(i => i.name === key);
      return { ...legendReference, value };
    });
    const TooltipComponent = props.customTooltip ?? ChartTooltip;
    createApp(TooltipComponent, { title: d[props.index].toString(), data: omittedData }).mount(componentDiv);
    wm.set(d, componentDiv.innerHTML);
    return componentDiv.innerHTML;
  }
}

function color(d: unknown, i: number) {
  return props.colors[i] ?? 'transparent';
}
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
