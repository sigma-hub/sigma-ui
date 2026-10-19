<script lang="ts" setup>
import { useAttrs } from 'vue';

import { CalendarCellTrigger, type CalendarCellTriggerProps, useForwardProps } from 'reka-ui';
import { buttonVariants } from '@ui/registry/css/ui/button';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<CalendarCellTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarCellTrigger
    class="sigma-ui-calendar-cell-trigger"
    :class="[buttonVariants({ variant: 'ghost' }), $attrs.class]"
    data-slot="calendar-cell-trigger"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
  >
    <slot />
  </CalendarCellTrigger>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-calendar-cell-trigger {
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

  .sigma-ui-calendar-cell-trigger:hover {
    background-color: var(--muted);
    color: var(--muted-foreground);
  }

  .sigma-ui-calendar-cell-trigger[data-today]:not([data-selected]) {
    background-color: var(--secondary);
    color: var(--secondary-foreground);
  }

  .sigma-ui-calendar-cell-trigger[data-selected] {
    background-color: var(--primary);
    color: var(--primary-foreground);
    opacity: 1;
  }

  .sigma-ui-calendar-cell-trigger[data-selected]:hover,
  .sigma-ui-calendar-cell-trigger[data-selected]:focus {
    background-color: var(--primary);
    color: var(--primary-foreground);
  }

  .sigma-ui-calendar-cell-trigger[data-disabled] {
    color: var(--muted-foreground);
    opacity: 0.5;
  }

  .sigma-ui-calendar-cell-trigger[data-unavailable] {
    color: var(--destructive-foreground);
    text-decoration: line-through;
  }

  .sigma-ui-calendar-cell-trigger[data-outside-month] {
    color: var(--muted-foreground);
    opacity: 0.5;
    pointer-events: none;
  }

  .sigma-ui-calendar-cell-trigger[data-outside-month][data-selected] {
    background-color: color-mix(in oklch, var(--secondary) 50%, transparent);
    color: var(--muted-foreground);
    opacity: 0.3;
  }
}
</style>
