<script lang="ts" setup>
import { RangeCalendarHeading, type RangeCalendarHeadingProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<RangeCalendarHeadingProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarHeading
    v-slot="{ headingValue }"
    :class="cn('text-sm font-medium', $attrs.class ?? '')"
    v-bind="forwardedProps"
  >
    <slot :heading-value>
      {{ headingValue }}
    </slot>
  </RangeCalendarHeading>
</template>
