<script lang="ts" setup>
import { RangeCalendarGridRow, type RangeCalendarGridRowProps, useForwardProps } from 'reka-ui';

const props = defineProps<RangeCalendarGridRowProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarGridRow
    class="sigma-ui-range-calendar-grid-row"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarGridRow>
</template>

<style>
.sigma-ui-range-calendar-grid-row {
  display: flex;
  margin-top: 0.5rem;
  width: 100%;
}
</style>
