<script lang="ts" setup>
import { YearPickerGridRow, type YearPickerGridRowProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<YearPickerGridRowProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerGridRow

    data-slot="year-picker-gridrow"
    v-bind="forwarded"
    :class="cn('flex', $attrs.class ?? '')"
  >
    <slot />
  </YearPickerGridRow>
</template>
