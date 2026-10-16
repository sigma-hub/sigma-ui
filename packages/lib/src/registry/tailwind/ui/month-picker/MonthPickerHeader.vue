<script lang="ts" setup>
import { MonthPickerHeader, type MonthPickerHeaderProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<MonthPickerHeaderProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerHeader

    data-slot="month-picker-header"
    v-bind="forwarded"
    :class="cn('relative flex w-full items-center justify-between', $attrs.class ?? '')"
  >
    <slot />
  </MonthPickerHeader>
</template>
