<script setup lang="ts">
import { useAttrs } from 'vue';

import { TimeFieldInput, type TimeFieldInputProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<TimeFieldInputProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <TimeFieldInput
    data-slot="time-field-input"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :data-part="props.part"
    class="sigma-ui-time-field-input"
    :class="[$attrs.class]"
  >
    <slot />
  </TimeFieldInput>
</template>

<style>
.sigma-ui-time-field-input {
  border-radius: var(--radius-sm);
  font-variant-numeric: tabular-nums;
  outline: none;
  padding-inline: 0.125rem;
}

.sigma-ui-time-field-input:focus {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.sigma-ui-time-field-input[data-part="literal"] {
  padding-inline: 0;
}

.sigma-ui-time-field-input[data-disabled] {
  cursor: not-allowed;
}
</style>
