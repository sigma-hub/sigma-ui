<script lang="ts" setup>
import { MonthPickerGridRow, type MonthPickerGridRowProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<MonthPickerGridRowProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerGridRow

    data-slot="month-picker-gridrow"
    v-bind="forwarded"
    :class="cn('flex', $attrs.class ?? '')"
  >
    <slot />
  </MonthPickerGridRow>
</template>
