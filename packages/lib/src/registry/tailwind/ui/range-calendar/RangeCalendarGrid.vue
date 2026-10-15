<script lang="ts" setup>
import { RangeCalendarGrid, type RangeCalendarGridProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<RangeCalendarGridProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarGrid
    :class="cn('w-full border-collapse space-y-1', $attrs.class ?? '')"
    v-bind="forwardedProps"
   data-slot="range-calendar-grid">
    <slot />
  </RangeCalendarGrid>
</template>
