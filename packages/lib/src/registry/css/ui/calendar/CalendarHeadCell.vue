<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { CalendarHeadCell, type CalendarHeadCellProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<CalendarHeadCellProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarHeadCell
    class="sigma-ui-calendar-head-cell"
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    data-slot="calendar-head-cell"
    :class="[$attrs.class]"
  >
    <slot />
  </CalendarHeadCell>
</template>

<style>
.sigma-ui-calendar-head-cell {
  width: 2.25rem;
  border-radius: var(--radius-md);
  color: var(--muted-foreground);
  font-size: 0.8rem;
  font-weight: normal;
}
</style>
