<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { RangeCalendarCell, type RangeCalendarCellProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<RangeCalendarCellProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarCell
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="cn('relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:bg-secondary first:[&:has([data-selected])]:rounded-l-md last:[&:has([data-selected])]:rounded-r-md [&:has([data-selected][data-outside-month])]:bg-secondary/50 [&:has([data-selected][data-selection-end])]:rounded-r-md [&:has([data-selected][data-selection-start])]:rounded-l-md', $attrs.class ?? '')"
    data-slot="range-calendar-cell"
  >
    <slot />
  </RangeCalendarCell>
</template>
