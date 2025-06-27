<script lang="ts" setup>
import { RangeCalendarNext, type RangeCalendarNextProps, useForwardProps } from 'reka-ui';
import { ChevronRightIcon } from 'lucide-vue-next';
import { buttonVariants } from '@ui/registry/css/ui/button';

const props = defineProps<RangeCalendarNextProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarNext
    class="sigma-ui-range-calendar-next"
    :class="[buttonVariants({ variant: 'outline' })]"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronRightIcon class="sigma-ui-range-calendar-next__icon" />
    </slot>
  </RangeCalendarNext>
</template>

<style>
.sigma-ui-range-calendar-next {
  height: 1.75rem;
  width: 1.75rem;
  background-color: transparent;
  padding: 0;
  opacity: 0.5;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-md);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.sigma-ui-range-calendar-next:hover {
  opacity: 1;
}

.sigma-ui-range-calendar-next__icon {
  height: 1rem;
  width: 1rem;
}
</style>
