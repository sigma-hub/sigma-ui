<script lang="ts" setup>
import { MonthPickerGrid, type MonthPickerGridProps, useForwardProps } from 'reka-ui';

const props = defineProps<MonthPickerGridProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerGrid

    data-slot="month-picker-grid"
    class="sigma-ui-month-picker-grid"
    v-bind="forwarded"
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
