<script lang="ts" setup>
import { useAttrs } from 'vue';

import { MonthPickerCellTrigger, type MonthPickerCellTriggerProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MonthPickerCellTriggerProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerCellTrigger
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    data-slot="month-picker-cell-trigger"
    :class="cn('inline-flex h-8 min-w-16 items-center justify-center rounded-md px-2 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&[data-today]:not([data-selected])]:bg-accent', $attrs.class ?? '')"
  >
    <slot />
  </MonthPickerCellTrigger>
</template>
