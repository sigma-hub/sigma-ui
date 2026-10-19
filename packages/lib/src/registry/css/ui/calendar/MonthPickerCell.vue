<script lang="ts" setup>
import { useAttrs } from 'vue';

import { MonthPickerCell, type MonthPickerCellProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MonthPickerCellProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerCell
    data-slot="month-picker-cell"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-month-picker-cell"
    :class="[$attrs.class]"
  >
    <slot />
  </MonthPickerCell>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-month-picker-cell {
    position: relative;
    padding: 0;
    font-size: 0.875rem;
    text-align: center;
  }
}
</style>
