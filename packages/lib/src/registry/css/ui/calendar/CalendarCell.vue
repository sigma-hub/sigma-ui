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
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    data-slot="calendar-cell"
    :class="[$attrs.class]"
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
  background-color: var(--secondary);
}

.sigma-ui-calendar-cell:has([data-selected][data-outside-month]) {
  background-color: color-mix(in oklch, var(--secondary) 50%, transparent);
}
</style>
