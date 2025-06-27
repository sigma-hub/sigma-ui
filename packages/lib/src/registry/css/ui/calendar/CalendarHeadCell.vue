<script lang="ts" setup>
import { CalendarHeadCell, type CalendarHeadCellProps, useForwardProps } from 'reka-ui';

const props = defineProps<CalendarHeadCellProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarHeadCell
    class="sigma-ui-calendar-head-cell"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeadCell>
</template>

<style>
.sigma-ui-calendar-head-cell {
  width: 2.25rem;
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  font-weight: normal;
  color: hsl(var(--muted-foreground));
}
</style>
