<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { RangeCalendarHeader, type RangeCalendarHeaderProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<RangeCalendarHeaderProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarHeader
    class="sigma-ui-range-calendar-header"
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    data-slot="range-calendar-header"
    :class="[$attrs.class]"
  >
    <slot />
  </RangeCalendarHeader>
</template>

<style>
.sigma-ui-range-calendar-header {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.25rem;
}
</style>
