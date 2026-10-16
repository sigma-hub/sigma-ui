<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { RangeCalendarNext, type RangeCalendarNextProps, useForwardProps } from 'reka-ui';
import { ChevronRightIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
import { buttonVariants } from '@ui/registry/tailwind/ui/button';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<RangeCalendarNextProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarNext
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="cn(
      buttonVariants({ variant: 'outline' }),
      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
      $attrs.class ?? '',
    )"
    data-slot="range-calendar-next-button"
  >
    <slot>
      <ChevronRightIcon class="h-4 w-4" />
    </slot>
  </RangeCalendarNext>
</template>
