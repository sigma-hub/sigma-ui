<script lang="ts" setup>
import { CalendarGrid, type CalendarGridProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<CalendarGridProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarGrid
    :class="cn('w-full border-collapse space-y-1', $attrs.class ?? '')"
    v-bind="forwardedProps"
   data-slot="calendar-grid">
    <slot />
  </CalendarGrid>
</template>
