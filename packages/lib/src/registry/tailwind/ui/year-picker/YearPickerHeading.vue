<script lang="ts" setup>
import { useAttrs } from 'vue';

import { YearPickerHeading, type YearPickerHeadingProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
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
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    data-slot="year-picker-heading"
    :class="cn('text-sm font-medium', $attrs.class ?? '')"
  >
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </YearPickerHeading>
</template>
