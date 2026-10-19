<script lang="ts" setup>
import { useAttrs } from 'vue';

import { CalendarCell, type CalendarCellProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
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
    data-slot="calendar-cell"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn('relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md [&:has([data-selected])]:bg-secondary [&:has([data-selected][data-outside-month])]:bg-secondary/50', $attrs.class ?? '')"
  >
    <slot />
  </CalendarCell>
</template>
