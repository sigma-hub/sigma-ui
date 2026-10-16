<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { MonthPickerGridRow, type MonthPickerGridRowProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<MonthPickerGridRowProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerGridRow
    v-bind="{ ...forwarded, ...delegatedAttrs }"

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
