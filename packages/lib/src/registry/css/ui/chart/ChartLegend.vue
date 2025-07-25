<script setup lang="ts">
import { VisBulletLegend } from '@unovis/vue';
import type { BulletLegendItemInterface } from '@unovis/ts';
import { BulletLegend } from '@unovis/ts';
import { nextTick, onMounted, ref } from 'vue';
import { buttonVariants } from '@ui/registry/css/ui/button';

const props = withDefaults(defineProps<{ items: BulletLegendItemInterface[] }>(), {
  items: () => [],
});

const emits = defineEmits<{
  'legendItemClick': [d: BulletLegendItemInterface, i: number];
  'update:items': [payload: BulletLegendItemInterface[]];
}>();

const elRef = ref<HTMLElement>();

onMounted(() => {
  const selector = `.${BulletLegend.selectors.item}`;
  nextTick(() => {
    const elements = elRef.value?.querySelectorAll(selector);
    const classes = buttonVariants({ variant: 'ghost', size: 'xs' }).split(' ');
    elements?.forEach(el => el.classList.add(...classes, 'sigma-ui-chart-legend__item'));
  });
});

function onLegendItemClick(d: BulletLegendItemInterface, i: number) {
  emits('legendItemClick', d, i);
  const isBulletActive = !props.items[i].inactive;
  const isFilterApplied = props.items.some(i => i.inactive);

  if (isFilterApplied && isBulletActive) {
    // reset filter
    emits('update:items', props.items.map(item => ({ ...item, inactive: false })));
  } else {
    // apply selection, set other item as inactive
    emits('update:items', props.items.map(item => item.name === d.name ? ({ ...d, inactive: false }) : { ...item, inactive: true }));
  }
}
</script>

<template>
  <div
    ref="elRef"
    class="sigma-ui-chart-legend"
  >
    <VisBulletLegend
      :items="items"
      :on-legend-item-click="onLegendItemClick"
    />
  </div>
</template>

<style>
.sigma-ui-chart-legend {
  width: max-content;
}

.sigma-ui-chart-legend__item {
  display: inline-flex !important;
  margin-right: 0.5rem;
}
</style>
