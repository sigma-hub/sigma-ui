<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { CalendarHeading, type CalendarHeadingProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<CalendarHeadingProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarHeading
    v-slot="{ headingValue }"
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="cn('text-sm font-medium', $attrs.class ?? '')"
    data-slot="calendar-heading"
  >
    <slot :heading-value>
      {{ headingValue }}
    </slot>
  </CalendarHeading>
</template>
