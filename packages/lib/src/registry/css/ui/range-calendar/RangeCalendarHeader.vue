<script lang="ts" setup>
import { RangeCalendarHeader, type RangeCalendarHeaderProps, useForwardProps } from 'reka-ui';

const props = defineProps<RangeCalendarHeaderProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarHeader
    class="sigma-ui-range-calendar-header"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarHeader>
</template>

<style>
.sigma-ui-range-calendar-header {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.25rem;
}
</style>
