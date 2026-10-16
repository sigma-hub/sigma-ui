<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { TimeRangeFieldInput, type TimeRangeFieldInputProps, useForwardProps } from 'reka-ui';

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
    class="sigma-ui-time-range-field-input"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="[$attrs.class]"
  >
    <slot />
  </TimeRangeFieldInput>
</template>

<style>
.sigma-ui-time-range-field-input {
  border-radius: var(--radius-sm);
  font-variant-numeric: tabular-nums;
  outline: none;
  padding-inline: 0.125rem;
}

.sigma-ui-time-range-field-input:focus {
  background-color: var(--accent);
  color: var(--accent-foreground);
}
</style>
