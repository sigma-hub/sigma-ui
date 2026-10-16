<script lang="ts" setup>
import { MonthPickerGrid, type MonthPickerGridProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<MonthPickerGridProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerGrid

    data-slot="month-picker-grid"
    v-bind="forwarded"
    :class="cn('w-full border-collapse', $attrs.class ?? '')"
  >
    <slot />
  </MonthPickerGrid>
</template>
