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
  height: 1.75rem;
  width: 1.75rem;
  background-color: transparent;
  padding: 0;
  opacity: 0.5;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-sm);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.sigma-ui-calendar-prev:hover {
  opacity: 1;
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-calendar-prev__icon {
  height: 1rem;
  width: 1rem;
}
</style>
