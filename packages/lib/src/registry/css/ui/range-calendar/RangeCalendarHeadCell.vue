<script lang="ts" setup>
import { useAttrs } from 'vue';

import { RangeCalendarHeadCell, type RangeCalendarHeadCellProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<RangeCalendarHeadCellProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarHeadCell
    class="sigma-ui-range-calendar-head-cell"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    data-slot="range-calendar-head-cell"
    :class="[$attrs.class]"
  >
    <slot />
  </RangeCalendarHeadCell>
</template>

<style>
.sigma-ui-range-calendar-head-cell {
  width: 2rem;
  border-radius: var(--radius-md);
  color: var(--muted-foreground);
  font-size: 0.8rem;
  font-weight: normal;
}
</style>
