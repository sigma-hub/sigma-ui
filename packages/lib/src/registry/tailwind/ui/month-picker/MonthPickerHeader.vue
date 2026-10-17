<script lang="ts" setup>
import { useAttrs } from 'vue';

import { MonthPickerHeader, type MonthPickerHeaderProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MonthPickerHeaderProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerHeader
    v-bind="{ ...forwarded, ...delegatedAttrs() }"

    data-slot="month-picker-header"
    :class="cn('relative flex w-full items-center justify-between', $attrs.class ?? '')"
  >
    <slot />
  </MonthPickerHeader>
</template>
