<script lang="ts" setup>
import { useAttrs } from 'vue';

import { RangeCalendarPrev, type RangeCalendarPrevProps, useForwardProps } from 'reka-ui';
import { ChevronLeftIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
import { buttonVariants } from '@ui/registry/tailwind/ui/button';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<RangeCalendarPrevProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarPrev
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn(
      buttonVariants({ variant: 'outline' }),
      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
      $attrs.class ?? '',
    )"
    data-slot="range-calendar-prev-button"
  >
    <slot>
      <ChevronLeftIcon class="h-4 w-4" />
    </slot>
  </RangeCalendarPrev>
</template>
