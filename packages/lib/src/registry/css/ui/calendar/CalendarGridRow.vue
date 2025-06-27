<script lang="ts" setup>
import { CalendarGridRow, type CalendarGridRowProps, useForwardProps } from 'reka-ui';

const props = defineProps<CalendarGridRowProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarGridRow
    class="sigma-ui-calendar-grid-row"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarGridRow>
</template>

<style>
.sigma-ui-calendar-grid-row {
  display: flex;
}
</style>
