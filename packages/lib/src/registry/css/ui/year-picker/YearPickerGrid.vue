<script lang="ts" setup>
import { YearPickerGrid, type YearPickerGridProps, useForwardProps } from 'reka-ui';

const props = defineProps<YearPickerGridProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerGrid

    data-slot="year-picker-grid"
    class="sigma-ui-year-picker-grid"
    v-bind="forwarded"
    :class="[$attrs.class]"
  >
    <slot />
  </YearPickerGrid>
</template>

<style>

.sigma-ui-year-picker-grid {
  display: flex;
  width: 100%;
  flex-direction: column;
  border-collapse: collapse;
}

</style>
