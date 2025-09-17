<script lang="ts" setup>
import { CalendarPrev, type CalendarPrevProps, useForwardProps } from 'reka-ui';
import { ChevronLeftIcon } from 'lucide-vue-next';
import { buttonVariants } from '@ui/registry/css/ui/button';

const props = defineProps<CalendarPrevProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarPrev
    class="sigma-ui-calendar-prev"
    :class="[buttonVariants({ variant: 'outline' })]"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronLeftIcon class="sigma-ui-calendar-prev__icon" />
    </slot>
  </CalendarPrev>
</template>

<style>
.sigma-ui-calendar-prev {
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-sm);
  background-color: transparent;
  opacity: 0.5;
  transition-duration: 150ms;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.sigma-ui-calendar-prev:hover {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  opacity: 1;
}

.sigma-ui-calendar-prev__icon {
  width: 1rem;
  height: 1rem;
}
</style>
