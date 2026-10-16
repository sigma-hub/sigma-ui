<script lang="ts" setup>
import { YearPickerGridRow, type YearPickerGridRowProps, useForwardProps } from 'reka-ui';

const props = defineProps<YearPickerGridRowProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerGridRow

    data-slot="year-picker-gridrow"
    class="sigma-ui-year-picker-gridrow"
    v-bind="forwarded"
    :class="[$attrs.class]"
  >
    <slot />
  </YearPickerGridRow>
</template>

<style>

.sigma-ui-year-picker-grid-row {
  display: flex;
}

</style>
