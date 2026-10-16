<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { MonthPickerGrid, type MonthPickerGridProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<MonthPickerGridProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerGrid
    v-bind="{ ...forwarded, ...delegatedAttrs }"

    data-slot="month-picker-grid"
    :class="cn('w-full border-collapse', $attrs.class ?? '')"
  >
    <slot />
  </MonthPickerGrid>
</template>
