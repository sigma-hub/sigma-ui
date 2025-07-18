<script lang="ts" setup>
import { RangeCalendarHeadCell, type RangeCalendarHeadCellProps, useForwardProps } from 'reka-ui';

const props = defineProps<RangeCalendarHeadCellProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarHeadCell
    class="sigma-ui-range-calendar-head-cell"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarHeadCell>
</template>

<style>
.sigma-ui-range-calendar-head-cell {
  width: 2rem;
  border-radius: var(--radius-md);
  color: hsl(var(--muted-foreground));
  font-size: 0.8rem;
  font-weight: normal;
}
</style>
