<script setup lang="ts">
import { VisTooltip } from '@unovis/vue';
import type { BulletLegendItemInterface } from '@unovis/ts';
import { omit } from '@unovis/ts';
import { type Component, createApp } from 'vue';
import { ChartTooltip } from '.';

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

const wm = new WeakMap();

function template(d: any, i: number, elements: (HTMLElement | SVGElement)[]) {
  if (props.index in d) {
    if (wm.has(d)) {
      return wm.get(d);
    } else {
      const componentDiv = document.createElement('div');
      const omittedData = Object.entries(omit(d, [props.index])).map(([key, value]) => {
        const legendReference = props.items?.find(i => i.name === key);
        return { ...legendReference, value: props.valueFormatter(value) };
      });
      const TooltipComponent = props.customTooltip ?? ChartTooltip;
      createApp(TooltipComponent, { title: d[props.index], data: omittedData }).mount(componentDiv);
      wm.set(d, componentDiv.innerHTML);
      return componentDiv.innerHTML;
    }
  } else {
    const data = d.data;

    if (wm.has(data)) {
      return wm.get(data);
    } else {
      const style = getComputedStyle(elements[i]);
      const omittedData = [{ name: data.name, value: props.valueFormatter(data[props.index]), color: style.fill }];
      const componentDiv = document.createElement('div');
      const TooltipComponent = props.customTooltip ?? ChartTooltip;
      createApp(TooltipComponent, { title: d[props.index], data: omittedData }).mount(componentDiv);
      wm.set(d, componentDiv.innerHTML);
      return componentDiv.innerHTML;
    }
  }
}
</script>

<template>
  <VisTooltip
    :horizontal-shift="20"
    :vertical-shift="20"
    :triggers="{
      [selector]: template,
    }"
  />
</template>
