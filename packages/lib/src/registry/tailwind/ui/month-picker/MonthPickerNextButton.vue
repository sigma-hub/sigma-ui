<script lang="ts" setup>
import { MonthPickerNext, type MonthPickerNextProps, useForwardProps } from 'reka-ui';
import { ChevronRightIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
import { buttonVariants } from '@ui/registry/tailwind/ui/button';

const props = defineProps<MonthPickerNextProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerNext
    data-slot="month-picker-next-button"
    v-bind="forwarded"
    :class="cn(buttonVariants({ variant: 'outline' }), 'size-7 bg-transparent p-0 opacity-50 hover:bg-accent hover:text-accent-foreground hover:opacity-100', $attrs.class ?? '')"
  >
    <slot>
      <ChevronRightIcon class="size-4" />
    </slot>
  </MonthPickerNext>
</template>
