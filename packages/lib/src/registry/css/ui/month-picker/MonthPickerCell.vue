<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { MonthPickerCell, type MonthPickerCellProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<MonthPickerCellProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerCell
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    data-slot="month-picker-cell"
    class="sigma-ui-month-picker-cell"
    :class="[$attrs.class]"
  >
    <slot />
  </MonthPickerCell>
</template>

<style>
.sigma-ui-month-picker-cell {
  position: relative;
  padding: 0;
  font-size: 0.875rem;
  text-align: center;
}
</style>
