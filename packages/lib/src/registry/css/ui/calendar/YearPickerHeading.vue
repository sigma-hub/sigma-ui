<script lang="ts" setup>
import { useAttrs } from 'vue';

import { YearPickerHeading, type YearPickerHeadingProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<YearPickerHeadingProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerHeading
    v-slot="{ headingValue }"
    data-slot="year-picker-heading"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-year-picker-heading"
    :class="[$attrs.class]"
  >
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </YearPickerHeading>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-year-picker-heading {
    font-size: 0.875rem;
    font-weight: 500;
  }
}
</style>
