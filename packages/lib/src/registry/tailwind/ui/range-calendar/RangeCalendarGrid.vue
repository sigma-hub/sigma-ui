<script lang="ts" setup>
import { useAttrs } from 'vue';

import { RangeCalendarGrid, type RangeCalendarGridProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<RangeCalendarGridProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarGrid
    data-slot="range-calendar-grid"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn('w-full border-collapse space-y-1', $attrs.class ?? '')"
  >
    <slot />
  </RangeCalendarGrid>
</template>
