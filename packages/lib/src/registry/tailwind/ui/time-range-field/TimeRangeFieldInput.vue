<script setup lang="ts">
import { TimeRangeFieldInput, type TimeRangeFieldInputProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<TimeRangeFieldInputProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <TimeRangeFieldInput
    data-slot="time-range-field-input"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn('rounded-sm px-0.5 tabular-nums outline-none focus:bg-accent focus:text-accent-foreground', $attrs.class ?? '')"
  />
</template>
