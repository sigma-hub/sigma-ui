<script lang="ts" setup>
import { useAttrs } from 'vue';

import { CalendarHeading, type CalendarHeadingProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<CalendarHeadingProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarHeading
    v-slot="{ headingValue }"
    class="sigma-ui-calendar-heading"
    data-slot="calendar-heading"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </CalendarHeading>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-calendar-heading {
    font-size: 0.875rem;
    font-weight: 500;
  }
}
</style>
