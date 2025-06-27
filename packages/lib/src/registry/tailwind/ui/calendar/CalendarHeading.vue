<script lang="ts" setup>
import { CalendarHeading, type CalendarHeadingProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<CalendarHeadingProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarHeading
    v-slot="{ headingValue }"
    :class="cn('text-sm font-medium', $attrs.class ?? '')"
    v-bind="forwardedProps"
  >
    <slot :heading-value>
      {{ headingValue }}
    </slot>
  </CalendarHeading>
</template>
