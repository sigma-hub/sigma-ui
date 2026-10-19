<script lang="ts" setup>
import { useAttrs } from 'vue';

import { MonthPickerHeading, type MonthPickerHeadingProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MonthPickerHeadingProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerHeading
    v-slot="{ headingValue }"
    data-slot="month-picker-heading"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-month-picker-heading"
    :class="[$attrs.class]"
  >
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </MonthPickerHeading>
</template>

<style>
@layer components {
  .sigma-ui-month-picker-heading {
    font-size: 0.875rem;
    font-weight: 500;
  }
}
</style>
