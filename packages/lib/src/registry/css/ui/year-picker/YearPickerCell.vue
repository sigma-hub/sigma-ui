<script lang="ts" setup>
import { YearPickerCell, type YearPickerCellProps, useForwardProps } from 'reka-ui';

const props = defineProps<YearPickerCellProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerCell
    data-slot="year-picker-cell"
    class="sigma-ui-year-picker-cell"
    v-bind="forwarded"
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
