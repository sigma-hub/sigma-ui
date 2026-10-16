<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { RangeCalendarHeadCell, type RangeCalendarHeadCellProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<RangeCalendarHeadCellProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarHeadCell
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="cn('w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground', $attrs.class ?? '')"
    data-slot="range-calendar-head-cell"
  >
    <slot />
  </RangeCalendarHeadCell>
</template>
