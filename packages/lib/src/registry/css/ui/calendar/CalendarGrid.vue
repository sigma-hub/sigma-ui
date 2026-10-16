<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { CalendarGrid, type CalendarGridProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<CalendarGridProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarGrid
    class="sigma-ui-calendar-grid"
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    data-slot="calendar-grid"
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
