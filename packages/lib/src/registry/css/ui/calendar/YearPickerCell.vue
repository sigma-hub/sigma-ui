<script lang="ts" setup>
import { useAttrs } from 'vue';

import { YearPickerCell, type YearPickerCellProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<YearPickerCellProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerCell
    data-slot="year-picker-cell"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-year-picker-cell"
    :class="[$attrs.class]"
  >
    <slot />
  </YearPickerCell>
</template>

<style>
@layer components {
  .sigma-ui-year-picker-cell {
    position: relative;
    padding: 0;
    font-size: 0.875rem;
    text-align: center;
  }
}
</style>
