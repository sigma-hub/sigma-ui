<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { MonthPickerHeading, type MonthPickerHeadingProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<MonthPickerHeadingProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerHeading
    v-slot="{ headingValue }"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    data-slot="month-picker-heading"
    :class="cn('text-sm font-medium', $attrs.class ?? '')"
  >
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </MonthPickerHeading>
</template>
