<script lang="ts" setup>
import { RangeCalendarHeader, type RangeCalendarHeaderProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<RangeCalendarHeaderProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarHeader
    :class="cn('relative flex w-full items-center justify-between pt-1', $attrs.class ?? '')"
    v-bind="forwardedProps"
   data-slot="range-calendar-header">
    <slot />
  </RangeCalendarHeader>
</template>
