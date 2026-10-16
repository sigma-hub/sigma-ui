<script lang="ts" setup>
import { MonthPickerPrev, type MonthPickerPrevProps, useForwardProps } from 'reka-ui';
import { ChevronLeftIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
import { buttonVariants } from '@ui/registry/tailwind/ui/button';

const props = defineProps<MonthPickerPrevProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerPrev
    data-slot="month-picker-prev-button"
    v-bind="forwarded"
    :class="cn(buttonVariants({ variant: 'outline' }), 'size-7 bg-transparent p-0 opacity-50 hover:bg-accent hover:text-accent-foreground hover:opacity-100', $attrs.class ?? '')"
  >
    <slot>
      <ChevronLeftIcon class="size-4" />
    </slot>
  </MonthPickerPrev>
</template>
