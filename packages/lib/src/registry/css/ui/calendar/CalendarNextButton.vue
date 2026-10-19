<script lang="ts" setup>
import { useAttrs } from 'vue';

import { CalendarNext, type CalendarNextProps, useForwardProps } from 'reka-ui';
import { ChevronRightIcon } from '@lucide/vue';
import { buttonVariants } from '@ui/registry/css/ui/button';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<CalendarNextProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarNext
    class="sigma-ui-calendar-next"
    :class="[buttonVariants({ variant: 'outline' }), $attrs.class]"
    data-slot="calendar-next-button"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
  >
    <slot>
      <ChevronRightIcon class="sigma-ui-calendar-next__icon" />
    </slot>
  </CalendarNext>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-calendar-next {
    width: calc(var(--spacing) * 7);
    height: calc(var(--spacing) * 7);
    padding: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background-color: transparent;
    opacity: 0.5;
    transition-duration: 150ms;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sigma-ui-calendar-next:hover {
    background-color: var(--secondary);
    color: var(--secondary-foreground);
    opacity: 1;
  }

  .sigma-ui-calendar-next__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }
}
</style>
