<script lang="ts" setup>
import { YearPickerHeader, type YearPickerHeaderProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<YearPickerHeaderProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerHeader

    data-slot="year-picker-header"
    v-bind="forwarded"
    :class="cn('relative flex w-full items-center justify-between', $attrs.class ?? '')"
  >
    <slot />
  </YearPickerHeader>
</template>
