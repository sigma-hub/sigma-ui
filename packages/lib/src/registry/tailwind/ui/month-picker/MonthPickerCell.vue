<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { MonthPickerCell, type MonthPickerCellProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<MonthPickerCellProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerCell
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    data-slot="month-picker-cell"
    :class="cn('relative p-0 text-center text-sm', $attrs.class ?? '')"
  >
    <slot />
  </MonthPickerCell>
</template>
