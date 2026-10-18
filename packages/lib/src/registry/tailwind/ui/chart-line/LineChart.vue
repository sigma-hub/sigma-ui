<script setup lang="ts" generic="T extends Record<string, any>
"
>
import { type BulletLegendItemInterface, CurveType } from '@unovis/ts';
import { VisAxis, VisLine, VisXYContainer } from '@unovis/vue';
import { Axis, Line } from '@unovis/ts';
import { type Component, computed, ref, useAttrs } from 'vue';
import { useMounted } from '@vueuse/core';
import type { BaseChartProps } from '.';
import { ChartContainer, ChartCrosshair, ChartLegend, colorsFromConfig } from '@ui/registry/tailwind/ui/chart';
import { cn } from '@ui/utils';
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
   * Type of curve
   */
  curveType?: CurveType;
}>(), {
  curveType: CurveType.MonotoneX,
  filterOpacity: 0.2,
  margin: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
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
</script>

<template>
  <div
    data-slot="line-chart"
    v-bind="delegatedAttrs()"
    :class="cn('w-full h-[400px] flex flex-col items-end', $attrs.class ?? '')"
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
        :margin="{ left: 20, right: 20 }"
        :data="data"
        :style="{ height: isMounted ? '100%' : 'auto' }"
      >
        <ChartCrosshair
          v-if="showTooltip"
          :colors="colors"
          :items="legendItems"
          :index="index"
          :custom-tooltip="customTooltip"
        />

        <template
          v-for="(category, i) in categories"
          :key="category"
        >
          <VisLine
            :x="(d: Data, i: number) => i"
            :y="(d: Data) => d[category]"
            :curve-type="curveType"
            :color="colors[i]"
            :attributes="{
              [Line.selectors.line]: {
                opacity: legendItems.find(item => item.name === category)?.inactive ? filterOpacity : 1,
              },
            }"
          />
        </template>

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
