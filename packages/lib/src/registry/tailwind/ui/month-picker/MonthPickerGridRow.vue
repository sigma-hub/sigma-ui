<script lang="ts" setup>
import { useAttrs } from 'vue';

import { MonthPickerGridRow, type MonthPickerGridRowProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MonthPickerGridRowProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerGridRow
    v-bind="{ ...forwarded, ...delegatedAttrs() }"

    data-slot="month-picker-gridrow"
    :class="cn('flex', $attrs.class ?? '')"
  >
    <slot />
  </MonthPickerGridRow>
</template>
