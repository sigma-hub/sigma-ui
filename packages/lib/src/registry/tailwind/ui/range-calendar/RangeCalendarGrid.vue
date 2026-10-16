<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { RangeCalendarGrid, type RangeCalendarGridProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<RangeCalendarGridProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarGrid
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="cn('w-full border-collapse space-y-1', $attrs.class ?? '')"
    data-slot="range-calendar-grid"
  >
    <slot />
  </RangeCalendarGrid>
</template>
