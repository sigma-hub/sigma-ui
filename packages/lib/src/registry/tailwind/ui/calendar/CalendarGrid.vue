<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { CalendarGrid, type CalendarGridProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<CalendarGridProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarGrid
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="cn('w-full border-collapse space-y-1', $attrs.class ?? '')"
    data-slot="calendar-grid"
  >
    <slot />
  </CalendarGrid>
</template>
