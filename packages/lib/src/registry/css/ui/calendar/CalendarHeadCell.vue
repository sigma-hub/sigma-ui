<script lang="ts" setup>
import { useAttrs } from 'vue';

import { CalendarHeadCell, type CalendarHeadCellProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<CalendarHeadCellProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarHeadCell
    class="sigma-ui-calendar-head-cell"
    data-slot="calendar-head-cell"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </CalendarHeadCell>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-calendar-head-cell {
    width: calc(var(--spacing) * 9);
    border-radius: var(--radius-md);
    color: var(--muted-foreground);
    font-size: 0.8rem;
    font-weight: normal;
  }
}
</style>
