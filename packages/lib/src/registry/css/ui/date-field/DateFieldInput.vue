<script setup lang="ts">
import { useAttrs } from 'vue';

import { DateFieldInput, type DateFieldInputProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DateFieldInputProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <DateFieldInput
    data-slot="date-field-input"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :data-part="props.part"
    class="sigma-ui-date-field-input"
    :class="[$attrs.class]"
  >
    <slot />
  </DateFieldInput>
</template>

<style>
.sigma-ui-date-field-input {
  border-radius: var(--radius-sm);
  font-variant-numeric: tabular-nums;
  outline: none;
  padding-inline: 0.125rem;
}

.sigma-ui-date-field-input:focus {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.sigma-ui-date-field-input[data-part="literal"] {
  padding-inline: 0;
}

.sigma-ui-date-field-input[data-disabled] {
  cursor: not-allowed;
}
</style>
