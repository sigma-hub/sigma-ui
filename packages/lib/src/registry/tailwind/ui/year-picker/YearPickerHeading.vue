<script lang="ts" setup>
import { YearPickerHeading, type YearPickerHeadingProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<YearPickerHeadingProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerHeading
    v-slot="{ headingValue }"
    data-slot="year-picker-heading"
    v-bind="forwarded"
    :class="cn('text-sm font-medium', $attrs.class ?? '')"
  >
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </YearPickerHeading>
</template>
