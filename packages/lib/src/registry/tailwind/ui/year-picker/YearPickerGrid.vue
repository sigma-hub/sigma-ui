<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { YearPickerGrid, type YearPickerGridProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<YearPickerGridProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerGrid
    v-bind="{ ...forwarded, ...delegatedAttrs }"

    data-slot="year-picker-grid"
    :class="cn('w-full border-collapse', $attrs.class ?? '')"
  >
    <slot />
  </YearPickerGrid>
</template>
