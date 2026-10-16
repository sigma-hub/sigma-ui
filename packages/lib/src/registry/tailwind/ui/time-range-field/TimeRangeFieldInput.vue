<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { TimeRangeFieldInput, type TimeRangeFieldInputProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<TimeRangeFieldInputProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <TimeRangeFieldInput
    data-slot="time-range-field-input"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('rounded-sm px-0.5 tabular-nums outline-none focus:bg-accent focus:text-accent-foreground', $attrs.class ?? '')"
  >
    <slot />
  </TimeRangeFieldInput>
</template>
