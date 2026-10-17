<script lang="ts" setup>
import { useAttrs } from 'vue';

import { MonthPickerGrid, type MonthPickerGridProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MonthPickerGridProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerGrid
    v-bind="{ ...forwarded, ...delegatedAttrs() }"

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
