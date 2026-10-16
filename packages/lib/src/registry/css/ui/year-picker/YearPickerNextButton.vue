<script lang="ts" setup>
import { YearPickerNext, type YearPickerNextProps, useForwardProps } from 'reka-ui';
import { ChevronRightIcon } from 'lucide-vue-next';
import { buttonVariants } from '@ui/registry/css/ui/button';

const props = defineProps<YearPickerNextProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerNext
    data-slot="year-picker-next-button"
    class="sigma-ui-year-picker-next"
    :class="[buttonVariants({ variant: 'outline' }), $attrs.class]"
    v-bind="forwarded"
  >
    <slot>
      <ChevronRightIcon class="sigma-ui-year-picker-next__icon" />
    </slot>
  </YearPickerNext>
</template>

<style>
.sigma-ui-year-picker-next {
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background-color: transparent;
  opacity: 0.5;
}

.sigma-ui-year-picker-next:hover {
  background-color: var(--accent);
  color: var(--accent-foreground);
  opacity: 1;
}

.sigma-ui-year-picker-next__icon {
  width: 1rem;
  height: 1rem;
}
</style>
