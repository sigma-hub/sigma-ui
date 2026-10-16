<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { CalendarHeader, type CalendarHeaderProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<CalendarHeaderProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarHeader
    class="sigma-ui-calendar-header"
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    data-slot="calendar-header"
    :class="[$attrs.class]"
  >
    <slot />
  </CalendarHeader>
</template>

<style>
.sigma-ui-calendar-header {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.25rem;
}
</style>
