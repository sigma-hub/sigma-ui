<script lang="ts" setup>
import { RangeCalendarNext, type RangeCalendarNextProps, useForwardProps } from 'reka-ui';
import { ChevronRightIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
import { buttonVariants } from '@ui/registry/tailwind/ui/button';

const props = defineProps<RangeCalendarNextProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarNext
    :class="cn(
      buttonVariants({ variant: 'outline' }),
      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
      $attrs.class ?? '',
    )"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronRightIcon class="h-4 w-4" />
    </slot>
  </RangeCalendarNext>
</template>
