<script lang="ts" setup>
import { useAttrs } from 'vue';

import { CalendarGrid, type CalendarGridProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<CalendarGridProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarGrid
    class="sigma-ui-calendar-grid"
    data-slot="calendar-grid"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </CalendarGrid>
</template>

<style>
.sigma-ui-calendar-grid {
  display: flex;
  width: 100%;
  flex-direction: column;
  border-collapse: collapse;
  gap: 0.25rem;
}
</style>
