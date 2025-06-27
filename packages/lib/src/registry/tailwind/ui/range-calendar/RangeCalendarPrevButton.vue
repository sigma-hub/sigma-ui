<script lang="ts" setup>
import { RangeCalendarPrev, type RangeCalendarPrevProps, useForwardProps } from 'reka-ui';
import { ChevronLeftIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
import { buttonVariants } from '@ui/registry/tailwind/ui/button';

const props = defineProps<RangeCalendarPrevProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarPrev
    :class="cn(
      buttonVariants({ variant: 'outline' }),
      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
      $attrs.class ?? '',
    )"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronLeftIcon class="h-4 w-4" />
    </slot>
  </RangeCalendarPrev>
</template>
