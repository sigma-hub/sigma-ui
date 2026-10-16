<script setup lang="ts">
import { AutocompleteInput, type AutocompleteInputEmits, type AutocompleteInputProps, useForwardPropsEmits } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<AutocompleteInputProps>();
const emits = defineEmits<AutocompleteInputEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AutocompleteInput
    data-slot="autocomplete-input"
    class="sigma-ui-autocomplete-input"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="[$attrs.class]"
  >
    <slot />
  </AutocompleteInput>
</template>

<style>
.sigma-ui-autocomplete-input {
  display: flex;
  width: 100%;
  height: 2.25rem;
  border: 1px solid var(--input);
  border-radius: var(--radius-md);
  background-color: transparent;
  font-size: 0.875rem;
  padding-block: 0.25rem;
  padding-inline: 0.75rem;
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
