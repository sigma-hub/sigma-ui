<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { YearPickerGrid, type YearPickerGridProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<YearPickerGridProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerGrid
    v-bind="{ ...forwarded, ...delegatedAttrs }"

    data-slot="year-picker-grid"
    class="sigma-ui-year-picker-grid"
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
