<script setup lang="ts" generic="T extends Record<string, any>
"
>
import type { BulletLegendItemInterface } from '@unovis/ts';
import { VisAxis, VisGroupedBar, VisStackedBar, VisXYContainer } from '@unovis/vue';
import { Axis, GroupedBar, StackedBar } from '@unovis/ts';
import { type Component, computed, ref, useAttrs } from 'vue';
import { useMounted } from '@vueuse/core';
import type { BaseChartProps } from '.';
import { ChartContainer, ChartCrosshair, ChartLegend, colorsFromConfig } from '@ui/registry/css/ui/chart';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<BaseChartProps<T> & {
  /**
   * Render custom tooltip component.
   */
  customTooltip?: Component;
  /**
   * Change the type of the chart
   * @default "grouped"
   */
  type?: 'stacked' | 'grouped';
  /**
   * Rounded bar corners
   * @default 0
   */
  roundedCorners?: number;
}>(), {
  type: 'grouped',
  margin: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  filterOpacity: 0.2,
  roundedCorners: 0,
  showXAxis: true,
  showYAxis: true,
  showTooltip: true,
  showLegend: true,
  showGridLine: true,
});
const emits = defineEmits<{
  /** Emitted when a legend item is clicked, with the item and its index. */
  legendItemClick: [d: BulletLegendItemInterface, i: number];
}>();

type KeyOfT = Extract<keyof T, string>;
type Data = typeof props.data[number];

const index = computed(() => props.index as KeyOfT);
const colors = computed(() => colorsFromConfig(props.categories, props.config, props.colors));
const legendItems = ref<BulletLegendItemInterface[]>(props.categories.map((category, i) => ({
  name: category,
  color: colors.value[i],
  inactive: false,
})));

const isMounted = useMounted();

function handleLegendItemClick(d: BulletLegendItemInterface, i: number) {
  emits('legendItemClick', d, i);
}

const VisBarComponent = computed(() => props.type === 'grouped' ? VisGroupedBar : VisStackedBar);
const selectorsBar = computed(() => props.type === 'grouped' ? GroupedBar.selectors.bar : StackedBar.selectors.bar);
</script>

<template>
  <div
    data-slot="bar-chart"
    v-bind="delegatedAttrs()"
    class="sigma-ui-bar-chart"
    :class="$attrs.class"
  >
    <ChartContainer
      :config="config"
      passthrough
    >
      <ChartLegend
        v-if="showLegend"
        v-model:items="legendItems"
        @legend-item-click="handleLegendItemClick"
      />

      <VisXYContainer
        :data="data"
        :style="{ height: isMounted ? '100%' : 'auto' }"
        :margin="margin"
      >
        <ChartCrosshair
          v-if="showTooltip"
          :colors="colors"
          :items="legendItems"
          :custom-tooltip="customTooltip"
          :index="index"
        />

        <VisBarComponent
          :x="(_: Data, i: number) => i"
          :y="categories.map(category => (d: Data) => d[category]) "
          :color="colors"
          :rounded-corners="roundedCorners"
          :bar-padding="0.05"
          :attributes="{
            [selectorsBar]: {
              opacity: (_: Data, i: number) => {
                const pos = i % categories.length
                return legendItems[pos]?.inactive ? filterOpacity : 1
              },
            },
          }"
        />

        <VisAxis
          v-if="showXAxis"
          type="x"
          :tick-format="xFormatter ?? ((v: number) => data[v]?.[index])"
          :grid-line="false"
          :tick-line="false"
          tick-text-color="var(--vis-text-color)"
        />
        <VisAxis
          v-if="showYAxis"
          type="y"
          :tick-line="false"
          :tick-format="yFormatter"
          :domain-line="false"
          :grid-line="showGridLine"
          :attributes="{
            [Axis.selectors.grid]: {
              class: 'text-muted',
            },
          }"
          tick-text-color="var(--vis-text-color)"
        />

        <slot />
      </VisXYContainer>
    </ChartContainer>
  </div>
</template>

<style>
@layer components {
  .sigma-ui-bar-chart {
    display: flex;
    width: 100%;
    height: 400px;
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>
