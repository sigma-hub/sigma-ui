<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { RangeCalendarNext, type RangeCalendarNextProps, useForwardProps } from 'reka-ui';
import { ChevronRightIcon } from 'lucide-vue-next';
import { buttonVariants } from '@ui/registry/css/ui/button';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<RangeCalendarNextProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarNext
    class="sigma-ui-range-calendar-next"
    :class="[buttonVariants({ variant: 'outline' }), $attrs.class]"
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    data-slot="range-calendar-next-button"
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
  border: 1px solid var(--border);
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
