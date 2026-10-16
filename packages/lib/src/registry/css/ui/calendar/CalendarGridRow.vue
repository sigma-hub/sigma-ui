<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { CalendarGridRow, type CalendarGridRowProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<CalendarGridRowProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarGridRow
    class="sigma-ui-calendar-grid-row"
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    data-slot="calendar-grid-row"
    :class="[$attrs.class]"
  >
    <slot />
  </CalendarGridRow>
</template>

<style>
.sigma-ui-calendar-grid-row {
  display: flex;
}
</style>
