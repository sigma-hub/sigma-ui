<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { RangeCalendarGrid, type RangeCalendarGridProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<RangeCalendarGridProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarGrid
    class="sigma-ui-range-calendar-grid"
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    data-slot="range-calendar-grid"
    :class="[$attrs.class]"
  >
    <slot />
  </RangeCalendarGrid>
</template>

<style>
.sigma-ui-range-calendar-grid {
  display: flex;
  width: 100%;
  flex-direction: column;
  border-collapse: collapse;
  gap: 0.25rem;
}
</style>
