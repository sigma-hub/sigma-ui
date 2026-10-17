<script lang="ts" setup>
import { useAttrs } from 'vue';

import { MonthPickerGridRow, type MonthPickerGridRowProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MonthPickerGridRowProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerGridRow
    v-bind="{ ...forwarded, ...delegatedAttrs() }"

    data-slot="month-picker-gridrow"
    class="sigma-ui-month-picker-gridrow"
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
