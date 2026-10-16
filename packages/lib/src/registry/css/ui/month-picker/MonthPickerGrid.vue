<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { MonthPickerGrid, type MonthPickerGridProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<MonthPickerGridProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerGrid
    v-bind="{ ...forwarded, ...delegatedAttrs }"

    data-slot="month-picker-grid"
    class="sigma-ui-month-picker-grid"
    :class="[$attrs.class]"
  >
    <slot />
  </MonthPickerGrid>
</template>

<style>

.sigma-ui-month-picker-grid {
  display: flex;
  width: 100%;
  flex-direction: column;
  border-collapse: collapse;
}

</style>
