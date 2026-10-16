<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { MonthPickerHeader, type MonthPickerHeaderProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<MonthPickerHeaderProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerHeader
    v-bind="{ ...forwarded, ...delegatedAttrs }"

    data-slot="month-picker-header"
    :class="cn('relative flex w-full items-center justify-between', $attrs.class ?? '')"
  >
    <slot />
  </MonthPickerHeader>
</template>
