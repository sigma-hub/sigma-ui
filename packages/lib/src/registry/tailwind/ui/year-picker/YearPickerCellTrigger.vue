<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { YearPickerCellTrigger, type YearPickerCellTriggerProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<YearPickerCellTriggerProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerCellTrigger
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    data-slot="year-picker-cell-trigger"
    :class="cn('inline-flex h-8 min-w-16 items-center justify-center rounded-md px-2 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&[data-today]:not([data-selected])]:bg-accent', $attrs.class ?? '')"
  >
    <slot />
  </YearPickerCellTrigger>
</template>
