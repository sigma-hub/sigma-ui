<script lang="ts" setup>
import { useAttrs } from 'vue';

import { CalendarHeadCell, type CalendarHeadCellProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<CalendarHeadCellProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarHeadCell
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn('w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground', $attrs.class ?? '')"
    data-slot="calendar-head-cell"
  >
    <slot />
  </CalendarHeadCell>
</template>
