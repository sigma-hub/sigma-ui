<script lang="ts" setup>
import { useAttrs } from 'vue';

import { CalendarGrid, type CalendarGridProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<CalendarGridProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarGrid
    data-slot="calendar-grid"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn('w-full border-collapse space-y-1', $attrs.class ?? '')"
  >
    <slot />
  </CalendarGrid>
</template>
