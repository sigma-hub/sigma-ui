<script lang="ts" setup>
import { CalendarHeading, type CalendarHeadingProps, useForwardProps } from 'reka-ui';

const props = defineProps<CalendarHeadingProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarHeading
    v-slot="{ headingValue }"
    class="sigma-ui-calendar-heading"
    v-bind="forwardedProps"
  >
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </CalendarHeading>
</template>

<style>
.sigma-ui-calendar-heading {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
