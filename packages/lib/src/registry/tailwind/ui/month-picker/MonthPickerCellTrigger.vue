<script lang="ts" setup>
import { MonthPickerCellTrigger, type MonthPickerCellTriggerProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<MonthPickerCellTriggerProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerCellTrigger
    data-slot="month-picker-cell-trigger"
    v-bind="forwarded"
    :class="cn('inline-flex h-8 min-w-16 items-center justify-center rounded-md px-2 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&[data-today]:not([data-selected])]:bg-accent', $attrs.class ?? '')"
  >
    <slot />
  </MonthPickerCellTrigger>
</template>
