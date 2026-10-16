<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { YearPickerHeading, type YearPickerHeadingProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<YearPickerHeadingProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerHeading
    v-slot="{ headingValue }"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    data-slot="year-picker-heading"
    class="sigma-ui-year-picker-heading"
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
