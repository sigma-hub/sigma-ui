<script lang="ts" setup>
import { useAttrs } from 'vue';

import { RangeCalendarHeadCell, type RangeCalendarHeadCellProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<RangeCalendarHeadCellProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarHeadCell
    data-slot="range-calendar-head-cell"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn('w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground', $attrs.class ?? '')"
  >
    <slot />
  </RangeCalendarHeadCell>
</template>
