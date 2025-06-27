<script lang="ts" setup>
import { RangeCalendarPrev, type RangeCalendarPrevProps, useForwardProps } from 'reka-ui';
import { ChevronLeftIcon } from 'lucide-vue-next';
import { buttonVariants } from '@ui/registry/css/ui/button';

const props = defineProps<RangeCalendarPrevProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarPrev
    class="sigma-ui-range-calendar-prev"
    :class="[buttonVariants({ variant: 'outline' })]"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronLeftIcon class="sigma-ui-range-calendar-prev__icon" />
    </slot>
  </RangeCalendarPrev>
</template>

<style>
.sigma-ui-range-calendar-prev {
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

.sigma-ui-range-calendar-prev:hover {
  opacity: 1;
}

.sigma-ui-range-calendar-prev__icon {
  height: 1rem;
  width: 1rem;
}
</style>
