<script lang="ts" setup>
import { useAttrs } from 'vue';

import { YearPickerGridRow, type YearPickerGridRowProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<YearPickerGridRowProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerGridRow
    v-bind="{ ...forwarded, ...delegatedAttrs() }"

    data-slot="year-picker-gridrow"
    :class="cn('flex', $attrs.class ?? '')"
  >
    <slot />
  </YearPickerGridRow>
</template>
