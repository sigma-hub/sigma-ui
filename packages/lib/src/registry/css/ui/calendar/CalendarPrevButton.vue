<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { CalendarPrev, type CalendarPrevProps, useForwardProps } from 'reka-ui';
import { ChevronLeftIcon } from 'lucide-vue-next';
import { buttonVariants } from '@ui/registry/css/ui/button';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<CalendarPrevProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarPrev
    class="sigma-ui-calendar-prev"
    :class="[buttonVariants({ variant: 'outline' }), $attrs.class]"
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    data-slot="calendar-prev-button"
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
  width: 1rem;
  height: 1rem;
}
</style>
