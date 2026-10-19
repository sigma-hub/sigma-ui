<script lang="ts" setup>
import { useAttrs } from 'vue';

import { CalendarHeader, type CalendarHeaderProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<CalendarHeaderProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarHeader
    class="sigma-ui-calendar-header"
    data-slot="calendar-header"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </CalendarHeader>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-calendar-header {
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding-top: calc(var(--spacing) * 1);
  }
}
</style>
