<script lang="ts" setup>
import { useAttrs } from 'vue';

import { RangeCalendarCell, type RangeCalendarCellProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<RangeCalendarCellProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarCell
    class="sigma-ui-range-calendar-cell"
    data-slot="range-calendar-cell"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </RangeCalendarCell>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-range-calendar-cell {
    position: relative;
    width: calc(var(--spacing) * 9);
    height: calc(var(--spacing) * 9);
    padding: 0;
    font-size: 0.875rem;
    text-align: center;
  }

  .sigma-ui-range-calendar-cell:focus-within {
    position: relative;
    z-index: 20;
  }

  .sigma-ui-range-calendar-cell:has([data-selected]) {
    background-color: var(--secondary);
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
    background-color: color-mix(in oklch, var(--secondary) 50%, transparent);
  }

  .sigma-ui-range-calendar-cell:has([data-selected][data-selection-end]) {
    border-bottom-right-radius: var(--radius-md);
    border-top-right-radius: var(--radius-md);
  }

  .sigma-ui-range-calendar-cell:has([data-selected][data-selection-start]) {
    border-bottom-left-radius: var(--radius-md);
    border-top-left-radius: var(--radius-md);
  }
}
</style>
