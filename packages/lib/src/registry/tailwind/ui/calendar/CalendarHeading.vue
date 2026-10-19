<script lang="ts" setup>
import { useAttrs } from 'vue';

import { CalendarHeading, type CalendarHeadingProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<CalendarHeadingProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarHeading
    v-slot="{ headingValue }"
    data-slot="calendar-heading"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn('text-sm font-medium', $attrs.class ?? '')"
  >
    <slot :heading-value>
      {{ headingValue }}
    </slot>
  </CalendarHeading>
</template>
