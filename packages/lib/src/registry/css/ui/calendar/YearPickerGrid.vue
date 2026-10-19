<script lang="ts" setup>
import { useAttrs } from 'vue';

import { YearPickerGrid, type YearPickerGridProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<YearPickerGridProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerGrid
    data-slot="year-picker-grid"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-year-picker-grid"
    :class="[$attrs.class]"
  >
    <slot />
  </YearPickerGrid>
</template>

<style>
@layer components {
  .sigma-ui-year-picker-grid {
    display: flex;
    width: 100%;
    flex-direction: column;
    border-collapse: collapse;
  }
}
</style>
