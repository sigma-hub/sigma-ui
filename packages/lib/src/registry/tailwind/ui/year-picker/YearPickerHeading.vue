<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { YearPickerHeading, type YearPickerHeadingProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
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
    :class="cn('text-sm font-medium', $attrs.class ?? '')"
  >
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </YearPickerHeading>
</template>
