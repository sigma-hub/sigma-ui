<script lang="ts" setup>
import { useAttrs } from 'vue';

import { MonthPickerGrid, type MonthPickerGridProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
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
    data-slot="month-picker-grid"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('w-full border-collapse', $attrs.class ?? '')"
  >
    <slot />
  </MonthPickerGrid>
</template>
