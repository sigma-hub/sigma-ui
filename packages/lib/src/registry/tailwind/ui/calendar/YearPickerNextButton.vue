<script lang="ts" setup>
import { useAttrs } from 'vue';

import { YearPickerNext, type YearPickerNextProps, useForwardProps } from 'reka-ui';
import { ChevronRightIcon } from '@lucide/vue';
import { cn } from '@ui/utils';
import { buttonVariants } from '@ui/registry/tailwind/ui/button';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<YearPickerNextProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerNext
    data-slot="year-picker-next-button"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn(buttonVariants({ variant: 'outline' }), 'size-7 bg-transparent p-0 opacity-50 hover:bg-accent hover:text-accent-foreground hover:opacity-100', $attrs.class ?? '')"
  >
    <slot>
      <ChevronRightIcon class="size-4" />
    </slot>
  </YearPickerNext>
</template>
