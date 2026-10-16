<script lang="ts" setup>
import { YearPickerHeading, type YearPickerHeadingProps, useForwardProps } from 'reka-ui';

const props = defineProps<YearPickerHeadingProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerHeading
    v-slot="{ headingValue }"
    data-slot="year-picker-heading"
    class="sigma-ui-year-picker-heading"
    v-bind="forwarded"
    :class="[$attrs.class]"
  >
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </YearPickerHeading>
</template>

<style>

.sigma-ui-year-picker-heading {
  font-size: 0.875rem;
  font-weight: 500;
}

</style>
