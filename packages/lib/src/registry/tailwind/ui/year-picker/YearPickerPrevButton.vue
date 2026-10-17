<script lang="ts" setup>
import { useAttrs } from 'vue';

import { YearPickerPrev, type YearPickerPrevProps, useForwardProps } from 'reka-ui';
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

const props = defineProps<YearPickerPrevProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerPrev
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    data-slot="year-picker-prev-button"
    :class="cn(buttonVariants({ variant: 'outline' }), 'size-7 bg-transparent p-0 opacity-50 hover:bg-accent hover:text-accent-foreground hover:opacity-100', $attrs.class ?? '')"
  >
    <slot>
      <ChevronLeftIcon class="size-4" />
    </slot>
  </YearPickerPrev>
</template>
