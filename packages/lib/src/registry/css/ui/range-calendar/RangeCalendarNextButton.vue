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
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-md);
  background-color: transparent;
  opacity: 0.5;
  transition-duration: 150ms;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.sigma-ui-range-calendar-next:hover {
  opacity: 1;
}

.sigma-ui-range-calendar-next__icon {
  width: 1rem;
  height: 1rem;
}
</style>
