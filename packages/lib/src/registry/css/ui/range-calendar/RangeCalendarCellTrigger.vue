<script lang="ts" setup>
import { RangeCalendarCellTrigger, type RangeCalendarCellTriggerProps, useForwardProps } from 'reka-ui';
import { buttonVariants } from '@ui/registry/css/ui/button';

const props = defineProps<RangeCalendarCellTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarCellTrigger
    class="sigma-ui-range-calendar-cell-trigger"
    :class="[buttonVariants({ variant: 'ghost' })]"
    v-bind="forwardedProps"
   data-slot="range-calendar-cell-trigger">
    <slot />
  </RangeCalendarCellTrigger>
</template>

<style>
.sigma-ui-range-calendar-cell-trigger {
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border-radius: var(--radius-sm);
  background-color: transparent;
  font-weight: normal;
  transition-duration: 150ms;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.sigma-ui-range-calendar-cell-trigger[data-selected] {
  opacity: 1;
}

.sigma-ui-range-calendar-cell-trigger[data-today]:not([data-selected]) {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-range-calendar-cell-trigger[data-selection-start],
.sigma-ui-range-calendar-cell-trigger[data-selection-end] {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.sigma-ui-range-calendar-cell-trigger[data-selection-start]:hover,
.sigma-ui-range-calendar-cell-trigger[data-selection-start]:focus,
.sigma-ui-range-calendar-cell-trigger[data-selection-end]:hover,
.sigma-ui-range-calendar-cell-trigger[data-selection-end]:focus {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.sigma-ui-range-calendar-cell-trigger[data-outside-month] {
  color: var(--muted-foreground);
  opacity: 0.5;
  pointer-events: none;
}

.sigma-ui-range-calendar-cell-trigger[data-outside-month][data-selected] {
  background-color: color-mix(in oklch, var(--secondary) 50%, transparent);
  color: var(--muted-foreground);
  opacity: 0.3;
}

.sigma-ui-range-calendar-cell-trigger[data-disabled] {
  color: var(--muted-foreground);
  opacity: 0.5;
}

.sigma-ui-range-calendar-cell-trigger[data-unavailable] {
  color: var(--destructive-foreground);
  text-decoration: line-through;
}
</style>
