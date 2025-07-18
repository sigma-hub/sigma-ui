<script lang="ts" setup>
import { CalendarGrid, type CalendarGridProps, useForwardProps } from 'reka-ui';

const props = defineProps<CalendarGridProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarGrid
    class="sigma-ui-calendar-grid"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarGrid>
</template>

<style>
.sigma-ui-calendar-grid {
  display: flex;
  width: 100%;
  flex-direction: column;
  border-collapse: collapse;
  gap: 0.25rem;
}
</style>
