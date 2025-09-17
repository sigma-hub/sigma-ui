<script lang="ts" setup>
import { CalendarCell, type CalendarCellProps, useForwardProps } from 'reka-ui';

const props = defineProps<CalendarCellProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarCell
    class="sigma-ui-calendar-cell"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCell>
</template>

<style>
.sigma-ui-calendar-cell {
  position: relative;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  font-size: 0.875rem;
  text-align: center;
}

.sigma-ui-calendar-cell:focus-within {
  position: relative;
  z-index: 20;
}

.sigma-ui-calendar-cell:has([data-selected]) {
  border-radius: var(--radius-md);
  background-color: hsl(var(--secondary));
}

.sigma-ui-calendar-cell:has([data-selected][data-outside-month]) {
  background-color: hsl(var(--secondary) / 50%);
}
</style>
