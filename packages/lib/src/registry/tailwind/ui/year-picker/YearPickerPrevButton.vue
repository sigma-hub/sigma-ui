<script lang="ts" setup>
import { YearPickerPrev, type YearPickerPrevProps, useForwardProps } from 'reka-ui';
import { ChevronLeftIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
import { buttonVariants } from '@ui/registry/tailwind/ui/button';

const props = defineProps<YearPickerPrevProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerPrev
    data-slot="year-picker-prev-button"
    v-bind="forwarded"
    :class="cn(buttonVariants({ variant: 'outline' }), 'size-7 bg-transparent p-0 opacity-50 hover:bg-accent hover:text-accent-foreground hover:opacity-100', $attrs.class ?? '')"
  >
    <slot>
      <ChevronLeftIcon class="size-4" />
    </slot>
  </YearPickerPrev>
</template>
