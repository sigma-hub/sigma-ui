<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { MonthPickerPrev, type MonthPickerPrevProps, useForwardProps } from 'reka-ui';
import { ChevronLeftIcon } from 'lucide-vue-next';
import { buttonVariants } from '@ui/registry/css/ui/button';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<MonthPickerPrevProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerPrev
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    data-slot="month-picker-prev-button"
    class="sigma-ui-month-picker-prev"
    :class="[buttonVariants({ variant: 'outline' }), $attrs.class]"
  >
    <slot>
      <ChevronLeftIcon class="sigma-ui-month-picker-prev__icon" />
    </slot>
  </MonthPickerPrev>
</template>

<style>
.sigma-ui-month-picker-prev {
  width: 1.75rem;
  height: 1.75rem;
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
  width: 1rem;
  height: 1rem;
}
</style>
