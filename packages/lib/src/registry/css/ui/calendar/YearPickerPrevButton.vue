<script lang="ts" setup>
import { useAttrs } from 'vue';

import { YearPickerPrev, type YearPickerPrevProps, useForwardProps } from 'reka-ui';
import { ChevronLeftIcon } from 'lucide-vue-next';
import { buttonVariants } from '@ui/registry/css/ui/button';
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
    data-slot="year-picker-prev-button"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-year-picker-prev"
    :class="[buttonVariants({ variant: 'outline' }), $attrs.class]"
  >
    <slot>
      <ChevronLeftIcon class="sigma-ui-year-picker-prev__icon" />
    </slot>
  </YearPickerPrev>
</template>

<style>
.sigma-ui-year-picker-prev {
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background-color: transparent;
  opacity: 0.5;
}

.sigma-ui-year-picker-prev:hover {
  background-color: var(--accent);
  color: var(--accent-foreground);
  opacity: 1;
}

.sigma-ui-year-picker-prev__icon {
  width: 1rem;
  height: 1rem;
}
</style>
