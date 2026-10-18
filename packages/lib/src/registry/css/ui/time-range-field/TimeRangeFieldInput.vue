<script setup lang="ts">
import { useAttrs } from 'vue';

import { TimeRangeFieldInput, type TimeRangeFieldInputProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<TimeRangeFieldInputProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <TimeRangeFieldInput
    data-slot="time-range-field-input"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :data-part="props.part"
    class="sigma-ui-time-range-field-input"
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
  padding-inline: calc(var(--spacing) * 0.5);
}

.sigma-ui-time-range-field-input:focus {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.sigma-ui-time-range-field-input[data-part="literal"] {
  padding-inline: 0;
}

.sigma-ui-time-range-field-input[data-disabled] {
  cursor: not-allowed;
}
</style>
