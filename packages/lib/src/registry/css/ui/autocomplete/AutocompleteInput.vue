<script setup lang="ts">
import { useAttrs } from 'vue';

import { AutocompleteInput, type AutocompleteInputEmits, type AutocompleteInputProps, useForwardPropsEmits } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<AutocompleteInputProps>();
const emits = defineEmits<AutocompleteInputEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AutocompleteInput
    data-slot="autocomplete-input"
    class="sigma-ui-autocomplete-input"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </AutocompleteInput>
</template>

<style>
.sigma-ui-autocomplete-input {
  display: flex;
  width: 100%;
  height: calc(var(--spacing) * 9);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--input);
  font-size: 0.875rem;
  padding-block: calc(var(--spacing) * 1);
  padding-inline: calc(var(--spacing) * 3);
}

.sigma-ui-autocomplete-input::placeholder {
  color: var(--muted-foreground);
}

.sigma-ui-autocomplete-input:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.sigma-ui-autocomplete-input:disabled {
  opacity: 0.5;
}
</style>
