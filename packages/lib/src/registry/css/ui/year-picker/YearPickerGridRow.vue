<script lang="ts" setup>
import { useAttrs } from 'vue';

import { YearPickerGridRow, type YearPickerGridRowProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<YearPickerGridRowProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerGridRow
    data-slot="year-picker-gridrow"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-year-picker-gridrow"
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
