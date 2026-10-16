<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { MonthPickerNext, type MonthPickerNextProps, useForwardProps } from 'reka-ui';
import { ChevronRightIcon } from 'lucide-vue-next';
import { buttonVariants } from '@ui/registry/css/ui/button';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<MonthPickerNextProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerNext
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    data-slot="month-picker-next-button"
    class="sigma-ui-month-picker-next"
    :class="[buttonVariants({ variant: 'outline' }), $attrs.class]"
  >
    <slot>
      <ChevronRightIcon class="sigma-ui-month-picker-next__icon" />
    </slot>
  </MonthPickerNext>
</template>

<style>
.sigma-ui-month-picker-next {
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background-color: transparent;
  opacity: 0.5;
}

.sigma-ui-month-picker-next:hover {
  background-color: var(--accent);
  color: var(--accent-foreground);
  opacity: 1;
}

.sigma-ui-month-picker-next__icon {
  width: 1rem;
  height: 1rem;
}
</style>
