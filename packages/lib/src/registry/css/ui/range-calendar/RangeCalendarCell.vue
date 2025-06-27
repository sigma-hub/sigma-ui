<script lang="ts" setup>
import { RangeCalendarCell, type RangeCalendarCellProps, useForwardProps } from 'reka-ui';

const props = defineProps<RangeCalendarCellProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarCell
    class="sigma-ui-range-calendar-cell"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarCell>
</template>

<style>
.sigma-ui-range-calendar-cell {
  position: relative;
  height: 2.25rem;
  width: 2.25rem;
  padding: 0;
  text-align: center;
  font-size: 0.875rem;
}

.sigma-ui-range-calendar-cell:focus-within {
  position: relative;
  z-index: 20;
}

.sigma-ui-range-calendar-cell:has([data-selected]) {
  background-color: hsl(var(--accent));
}

.sigma-ui-range-calendar-cell:first-child:has([data-selected]) {
  border-top-left-radius: var(--radius-md);
  border-bottom-left-radius: var(--radius-md);
}

.sigma-ui-range-calendar-cell:last-child:has([data-selected]) {
  border-top-right-radius: var(--radius-md);
  border-bottom-right-radius: var(--radius-md);
}

.sigma-ui-range-calendar-cell:has([data-selected][data-outside-month]) {
  background-color: hsl(var(--accent) / 0.5);
}

.sigma-ui-range-calendar-cell:has([data-selected][data-selection-end]) {
  border-top-right-radius: var(--radius-md);
  border-bottom-right-radius: var(--radius-md);
}

.sigma-ui-range-calendar-cell:has([data-selected][data-selection-start]) {
  border-top-left-radius: var(--radius-md);
  border-bottom-left-radius: var(--radius-md);
}
</style>
