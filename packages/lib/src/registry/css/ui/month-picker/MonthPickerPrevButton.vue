<script lang="ts" setup>
import { MonthPickerPrev, type MonthPickerPrevProps, useForwardProps } from 'reka-ui';
import { ChevronLeftIcon } from 'lucide-vue-next';
import { buttonVariants } from '@ui/registry/css/ui/button';

const props = defineProps<MonthPickerPrevProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerPrev
    data-slot="month-picker-prev-button"
    class="sigma-ui-month-picker-prev"
    :class="[buttonVariants({ variant: 'outline' }), $attrs.class]"
    v-bind="forwarded"
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
