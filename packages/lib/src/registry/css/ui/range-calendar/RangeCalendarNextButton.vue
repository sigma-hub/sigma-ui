<script lang="ts" setup>
import { useAttrs } from 'vue';

import { RangeCalendarNext, type RangeCalendarNextProps, useForwardProps } from 'reka-ui';
import { ChevronRightIcon } from '@lucide/vue';
import { buttonVariants } from '@ui/registry/css/ui/button';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<RangeCalendarNextProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarNext
    class="sigma-ui-range-calendar-next"
    :class="[buttonVariants({ variant: 'outline' }), $attrs.class]"
    data-slot="range-calendar-next-button"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
  >
    <slot>
      <ChevronRightIcon class="sigma-ui-range-calendar-next__icon" />
    </slot>
  </RangeCalendarNext>
</template>

<style>
.sigma-ui-range-calendar-next {
  width: calc(var(--spacing) * 7);
  height: calc(var(--spacing) * 7);
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
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}
</style>
