<script lang="ts" setup>
import { YearPickerGrid, type YearPickerGridProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<YearPickerGridProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerGrid

    data-slot="year-picker-grid"
    v-bind="forwarded"
    :class="cn('w-full border-collapse', $attrs.class ?? '')"
  >
    <slot />
  </YearPickerGrid>
</template>
