<script lang="ts" setup>
import { MonthPickerHeading, type MonthPickerHeadingProps, useForwardProps } from 'reka-ui';

const props = defineProps<MonthPickerHeadingProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerHeading
    v-slot="{ headingValue }"
    data-slot="month-picker-heading"
    class="sigma-ui-month-picker-heading"
    v-bind="forwarded"
    :class="[$attrs.class]"
  >
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </MonthPickerHeading>
</template>

<style>

.sigma-ui-month-picker-heading {
  font-size: 0.875rem;
  font-weight: 500;
}

</style>
