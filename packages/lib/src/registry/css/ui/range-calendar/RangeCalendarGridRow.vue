<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { RangeCalendarGridRow, type RangeCalendarGridRowProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<RangeCalendarGridRowProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarGridRow
    class="sigma-ui-range-calendar-grid-row"
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    data-slot="range-calendar-grid-row"
    :class="[$attrs.class]"
  >
    <slot />
  </RangeCalendarGridRow>
</template>

<style>
.sigma-ui-range-calendar-grid-row {
  display: flex;
  width: 100%;
  margin-top: 0.5rem;
}
</style>
