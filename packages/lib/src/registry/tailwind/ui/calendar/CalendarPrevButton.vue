<script lang="ts" setup>
import { useAttrs } from 'vue';

import { CalendarPrev, type CalendarPrevProps, useForwardProps } from 'reka-ui';
import { ChevronLeftIcon } from '@lucide/vue';
import { cn } from '@ui/utils';
import { buttonVariants } from '@ui/registry/tailwind/ui/button';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<CalendarPrevProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarPrev
    data-slot="calendar-prev-button"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn(
      buttonVariants({ variant: 'outline' }),
      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
      $attrs.class ?? '',
    )"
  >
    <slot>
      <ChevronLeftIcon class="h-4 w-4" />
    </slot>
  </CalendarPrev>
</template>
