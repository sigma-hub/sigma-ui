<script lang="ts" setup>
import { RangeCalendarHeading, type RangeCalendarHeadingProps, useForwardProps } from 'reka-ui';

const props = defineProps<RangeCalendarHeadingProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarHeading
    v-slot="{ headingValue }"
    class="sigma-ui-range-calendar-heading"
    v-bind="forwardedProps"
  >
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </RangeCalendarHeading>
</template>

<style>
.sigma-ui-range-calendar-heading {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
