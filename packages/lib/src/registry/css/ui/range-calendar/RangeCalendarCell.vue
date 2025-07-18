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
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  font-size: 0.875rem;
  text-align: center;
}

.sigma-ui-range-calendar-cell:focus-within {
  position: relative;
  z-index: 20;
}

.sigma-ui-range-calendar-cell:has([data-selected]) {
  background-color: hsl(var(--accent));
}

.sigma-ui-range-calendar-cell:first-child:has([data-selected]) {
  border-bottom-left-radius: var(--radius-md);
  border-top-left-radius: var(--radius-md);
}

.sigma-ui-range-calendar-cell:last-child:has([data-selected]) {
  border-bottom-right-radius: var(--radius-md);
  border-top-right-radius: var(--radius-md);
}

.sigma-ui-range-calendar-cell:has([data-selected][data-outside-month]) {
  background-color: hsl(var(--accent) / 50%);
}

.sigma-ui-range-calendar-cell:has([data-selected][data-selection-end]) {
  border-bottom-right-radius: var(--radius-md);
  border-top-right-radius: var(--radius-md);
}

.sigma-ui-range-calendar-cell:has([data-selected][data-selection-start]) {
  border-bottom-left-radius: var(--radius-md);
  border-top-left-radius: var(--radius-md);
}
</style>
