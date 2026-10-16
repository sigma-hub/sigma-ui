<script lang="ts" setup>
import { MonthPickerGridRow, type MonthPickerGridRowProps, useForwardProps } from 'reka-ui';

const props = defineProps<MonthPickerGridRowProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerGridRow

    data-slot="month-picker-gridrow"
    class="sigma-ui-month-picker-gridrow"
    v-bind="forwarded"
    :class="[$attrs.class]"
  >
    <slot />
  </MonthPickerGridRow>
</template>

<style>

.sigma-ui-month-picker-grid-row {
  display: flex;
}

</style>
