<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { YearPickerGridRow, type YearPickerGridRowProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<YearPickerGridRowProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerGridRow
    v-bind="{ ...forwarded, ...delegatedAttrs }"

    data-slot="year-picker-gridrow"
    :class="cn('flex', $attrs.class ?? '')"
  >
    <slot />
  </YearPickerGridRow>
</template>
