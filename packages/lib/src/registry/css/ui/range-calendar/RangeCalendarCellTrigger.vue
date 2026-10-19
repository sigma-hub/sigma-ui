<script lang="ts" setup>
import { useAttrs } from 'vue';

import { RangeCalendarCellTrigger, type RangeCalendarCellTriggerProps, useForwardProps } from 'reka-ui';
import { buttonVariants } from '@ui/registry/css/ui/button';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<RangeCalendarCellTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarCellTrigger
    class="sigma-ui-range-calendar-cell-trigger"
    :class="[buttonVariants({ variant: 'ghost' }), $attrs.class]"
    data-slot="range-calendar-cell-trigger"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
  >
    <slot />
  </RangeCalendarCellTrigger>
</template>

<style>
@layer components {
  .sigma-ui-range-calendar-cell-trigger {
    width: calc(var(--spacing) * 9);
    height: calc(var(--spacing) * 9);
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
}
</style>
