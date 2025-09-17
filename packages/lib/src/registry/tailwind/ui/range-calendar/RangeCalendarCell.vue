<script lang="ts" setup>
import { RangeCalendarCell, type RangeCalendarCellProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<RangeCalendarCellProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarCell
    :class="cn('relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:bg-secondary first:[&:has([data-selected])]:rounded-l-md last:[&:has([data-selected])]:rounded-r-md [&:has([data-selected][data-outside-month])]:bg-secondary/50 [&:has([data-selected][data-selection-end])]:rounded-r-md [&:has([data-selected][data-selection-start])]:rounded-l-md', $attrs.class ?? '')"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarCell>
</template>
