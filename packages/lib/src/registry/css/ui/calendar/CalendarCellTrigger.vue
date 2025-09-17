<script lang="ts" setup>
import { CalendarCellTrigger, type CalendarCellTriggerProps, useForwardProps } from 'reka-ui';
import { buttonVariants } from '@ui/registry/css/ui/button';

const props = defineProps<CalendarCellTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarCellTrigger
    class="sigma-ui-calendar-cell-trigger"
    :class="[buttonVariants({ variant: 'ghost' })]"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCellTrigger>
</template>

<style>
.sigma-ui-calendar-cell-trigger {
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

.sigma-ui-calendar-cell-trigger:hover {
  background-color: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
}

.sigma-ui-calendar-cell-trigger[data-today]:not([data-selected]) {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}

.sigma-ui-calendar-cell-trigger[data-selected] {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  opacity: 1;
}

.sigma-ui-calendar-cell-trigger[data-selected]:hover,
.sigma-ui-calendar-cell-trigger[data-selected]:focus {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.sigma-ui-calendar-cell-trigger[data-disabled] {
  color: hsl(var(--muted-foreground));
  opacity: 0.5;
}

.sigma-ui-calendar-cell-trigger[data-unavailable] {
  color: hsl(var(--destructive-foreground));
  text-decoration: line-through;
}

.sigma-ui-calendar-cell-trigger[data-outside-month] {
  color: hsl(var(--muted-foreground));
  opacity: 0.5;
  pointer-events: none;
}

.sigma-ui-calendar-cell-trigger[data-outside-month][data-selected] {
  background-color: hsl(var(--secondary) / 50%);
  color: hsl(var(--muted-foreground));
  opacity: 0.3;
}
</style>
