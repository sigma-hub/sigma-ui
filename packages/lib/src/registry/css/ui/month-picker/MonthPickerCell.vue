<script lang="ts" setup>
import { MonthPickerCell, type MonthPickerCellProps, useForwardProps } from 'reka-ui';

const props = defineProps<MonthPickerCellProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerCell
    data-slot="month-picker-cell"
    class="sigma-ui-month-picker-cell"
    v-bind="forwarded"
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
