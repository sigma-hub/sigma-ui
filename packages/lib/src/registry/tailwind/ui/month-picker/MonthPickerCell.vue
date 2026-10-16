<script lang="ts" setup>
import { MonthPickerCell, type MonthPickerCellProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<MonthPickerCellProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerCell
    data-slot="month-picker-cell"
    v-bind="forwarded"
    :class="cn('relative p-0 text-center text-sm', $attrs.class ?? '')"
  >
    <slot />
  </MonthPickerCell>
</template>
