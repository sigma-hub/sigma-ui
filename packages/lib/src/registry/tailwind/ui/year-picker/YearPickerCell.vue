<script lang="ts" setup>
import { YearPickerCell, type YearPickerCellProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<YearPickerCellProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerCell
    data-slot="year-picker-cell"
    v-bind="forwarded"
    :class="cn('relative p-0 text-center text-sm', $attrs.class ?? '')"
  >
    <slot />
  </YearPickerCell>
</template>
