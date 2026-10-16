<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { YearPickerCell, type YearPickerCellProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<YearPickerCellProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerCell
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    data-slot="year-picker-cell"
    class="sigma-ui-year-picker-cell"
    :class="[$attrs.class]"
  >
    <slot />
  </YearPickerCell>
</template>

<style>
.sigma-ui-year-picker-cell {
  position: relative;
  padding: 0;
  font-size: 0.875rem;
  text-align: center;
}
</style>
