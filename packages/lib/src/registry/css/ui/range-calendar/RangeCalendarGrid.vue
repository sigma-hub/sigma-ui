<script lang="ts" setup>
import { RangeCalendarGrid, type RangeCalendarGridProps, useForwardProps } from 'reka-ui';

const props = defineProps<RangeCalendarGridProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarGrid
    class="sigma-ui-range-calendar-grid"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarGrid>
</template>

<style>
.sigma-ui-range-calendar-grid {
  display: flex;
  width: 100%;
  flex-direction: column;
  border-collapse: collapse;
  gap: 0.25rem;
}
</style>
