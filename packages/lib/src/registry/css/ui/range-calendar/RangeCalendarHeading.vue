<script lang="ts" setup>
import { useAttrs } from 'vue';

import { RangeCalendarHeading, type RangeCalendarHeadingProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<RangeCalendarHeadingProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarHeading
    v-slot="{ headingValue }"
    class="sigma-ui-range-calendar-heading"
    data-slot="range-calendar-heading"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </RangeCalendarHeading>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-range-calendar-heading {
    font-size: 0.875rem;
    font-weight: 500;
  }
}
</style>
