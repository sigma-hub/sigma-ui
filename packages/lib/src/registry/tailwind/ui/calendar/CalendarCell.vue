<script lang="ts" setup>
import { CalendarCell, type CalendarCellProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<CalendarCellProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarCell
    :class="cn('relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md [&:has([data-selected])]:bg-secondary [&:has([data-selected][data-outside-month])]:bg-secondary/50', $attrs.class ?? '')"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCell>
</template>
