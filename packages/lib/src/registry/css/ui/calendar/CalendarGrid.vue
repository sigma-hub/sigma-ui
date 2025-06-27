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
  width: 100%;
  border-collapse: collapse;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>
