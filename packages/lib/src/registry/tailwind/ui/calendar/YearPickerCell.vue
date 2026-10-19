<script lang="ts" setup>
import { useAttrs } from 'vue';

import { YearPickerCell, type YearPickerCellProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<YearPickerCellProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerCell
    data-slot="year-picker-cell"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('relative p-0 text-center text-sm', $attrs.class ?? '')"
  >
    <slot />
  </YearPickerCell>
</template>
