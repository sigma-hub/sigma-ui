<script lang="ts" setup>
import { useAttrs } from 'vue';

import { CalendarCell, type CalendarCellProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<CalendarCellProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarCell
    class="sigma-ui-calendar-cell"
    data-slot="calendar-cell"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </CalendarCell>
</template>

<style>
@layer components {
  .sigma-ui-calendar-cell {
    position: relative;
    width: calc(var(--spacing) * 9);
    height: calc(var(--spacing) * 9);
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
    background-color: var(--secondary);
  }

  .sigma-ui-calendar-cell:has([data-selected][data-outside-month]) {
    background-color: color-mix(in oklch, var(--secondary) 50%, transparent);
  }
}
</style>
