<script lang="ts" setup>
import { useAttrs } from 'vue';

import { RangeCalendarHeader, type RangeCalendarHeaderProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<RangeCalendarHeaderProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarHeader
    class="sigma-ui-range-calendar-header"
    data-slot="range-calendar-header"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </RangeCalendarHeader>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-range-calendar-header {
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding-top: calc(var(--spacing) * 1);
  }
}
</style>
