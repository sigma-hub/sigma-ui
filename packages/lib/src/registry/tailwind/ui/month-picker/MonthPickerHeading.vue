<script lang="ts" setup>
import { MonthPickerHeading, type MonthPickerHeadingProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<MonthPickerHeadingProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerHeading
    v-slot="{ headingValue }"
    data-slot="month-picker-heading"
    v-bind="forwarded"
    :class="cn('text-sm font-medium', $attrs.class ?? '')"
  >
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </MonthPickerHeading>
</template>
