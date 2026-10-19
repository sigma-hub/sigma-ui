<script lang="ts" setup>
import { useAttrs } from 'vue';

import { MonthPickerPrev, type MonthPickerPrevProps, useForwardProps } from 'reka-ui';
import { ChevronLeftIcon } from '@lucide/vue';
import { buttonVariants } from '@ui/registry/css/ui/button';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MonthPickerPrevProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerPrev
    data-slot="month-picker-prev-button"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-month-picker-prev"
    :class="[buttonVariants({ variant: 'outline' }), $attrs.class]"
  >
    <slot>
      <ChevronLeftIcon class="sigma-ui-month-picker-prev__icon" />
    </slot>
  </MonthPickerPrev>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-month-picker-prev {
    width: calc(var(--spacing) * 7);
    height: calc(var(--spacing) * 7);
    padding: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background-color: transparent;
    opacity: 0.5;
  }

  .sigma-ui-month-picker-prev:hover {
    background-color: var(--accent);
    color: var(--accent-foreground);
    opacity: 1;
  }

  .sigma-ui-month-picker-prev__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }
}
</style>
