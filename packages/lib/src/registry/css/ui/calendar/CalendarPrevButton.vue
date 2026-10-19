<script lang="ts" setup>
import { useAttrs } from 'vue';

import { CalendarPrev, type CalendarPrevProps, useForwardProps } from 'reka-ui';
import { ChevronLeftIcon } from '@lucide/vue';
import { buttonVariants } from '@ui/registry/css/ui/button';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<CalendarPrevProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarPrev
    class="sigma-ui-calendar-prev"
    :class="[buttonVariants({ variant: 'outline' }), $attrs.class]"
    data-slot="calendar-prev-button"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
  >
    <slot>
      <ChevronLeftIcon class="sigma-ui-calendar-prev__icon" />
    </slot>
  </CalendarPrev>
</template>

<style>
@layer components {
  .sigma-ui-calendar-prev {
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

  .sigma-ui-calendar-prev:hover {
    background-color: var(--secondary);
    color: var(--secondary-foreground);
    opacity: 1;
  }

  .sigma-ui-calendar-prev__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }
}
</style>
