<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { ColorFieldInput, type ColorFieldInputProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ColorFieldInputProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ColorFieldInput
    data-slot="color-field-input"
    class="sigma-ui-color-field-input"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="[$attrs.class]"
  />
</template>

<style>
.sigma-ui-color-field-input {
  display: flex;
  width: 100%;
  min-width: 0;
  height: 2.25rem;
  border: 1px solid var(--input);
  border-radius: var(--radius-md);
  background-color: transparent;
  font-size: 1rem;
  padding-block: 0.25rem;
  padding-inline: 0.75rem;
}

.sigma-ui-color-field-input:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

@media (width >= 48rem) {
  .sigma-ui-color-field-input {
    font-size: 0.875rem;
  }
}
</style>
