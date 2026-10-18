<script lang="ts" setup>
import { useAttrs } from 'vue';

import { RangeCalendarHeader, type RangeCalendarHeaderProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<RangeCalendarHeaderProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarHeader
    data-slot="range-calendar-header"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn('relative flex w-full items-center justify-between pt-1', $attrs.class ?? '')"
  >
    <slot />
  </RangeCalendarHeader>
</template>
