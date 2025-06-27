<script lang="ts" setup>
import { CalendarHeader, type CalendarHeaderProps, useForwardProps } from 'reka-ui';

const props = defineProps<CalendarHeaderProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarHeader
    class="sigma-ui-calendar-header"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeader>
</template>

<style>
.sigma-ui-calendar-header {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.25rem;
}
</style>
