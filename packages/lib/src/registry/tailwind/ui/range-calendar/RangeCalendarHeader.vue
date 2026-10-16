<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { RangeCalendarHeader, type RangeCalendarHeaderProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<RangeCalendarHeaderProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarHeader
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="cn('relative flex w-full items-center justify-between pt-1', $attrs.class ?? '')"
    data-slot="range-calendar-header"
  >
    <slot />
  </RangeCalendarHeader>
</template>
