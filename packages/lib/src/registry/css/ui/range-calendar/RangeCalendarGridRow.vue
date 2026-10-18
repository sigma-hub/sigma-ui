<script lang="ts" setup>
import { useAttrs } from 'vue';

import { RangeCalendarGridRow, type RangeCalendarGridRowProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<RangeCalendarGridRowProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarGridRow
    class="sigma-ui-range-calendar-grid-row"
    data-slot="range-calendar-grid-row"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </RangeCalendarGridRow>
</template>

<style>
.sigma-ui-range-calendar-grid-row {
  display: flex;
  width: 100%;
  margin-top: calc(var(--spacing) * 2);
}
</style>
