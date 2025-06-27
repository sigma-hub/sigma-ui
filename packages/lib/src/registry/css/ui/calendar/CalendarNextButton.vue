<script lang="ts" setup>
import { CalendarNext, type CalendarNextProps, useForwardProps } from 'reka-ui';
import { ChevronRightIcon } from 'lucide-vue-next';
import { buttonVariants } from '@ui/registry/css/ui/button';

const props = defineProps<CalendarNextProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarNext
    class="sigma-ui-calendar-next"
    :class="[buttonVariants({ variant: 'outline' })]"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronRightIcon class="sigma-ui-calendar-next__icon" />
    </slot>
  </CalendarNext>
</template>

<style>
.sigma-ui-calendar-next {
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

.sigma-ui-calendar-next:hover {
  opacity: 1;
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-calendar-next__icon {
  height: 1rem;
  width: 1rem;
}
</style>
