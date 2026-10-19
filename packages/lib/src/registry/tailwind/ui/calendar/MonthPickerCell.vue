<script lang="ts" setup>
import { useAttrs } from 'vue';

import { MonthPickerCell, type MonthPickerCellProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MonthPickerCellProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerCell
    data-slot="month-picker-cell"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('relative p-0 text-center text-sm', $attrs.class ?? '')"
  >
    <slot />
  </MonthPickerCell>
</template>
