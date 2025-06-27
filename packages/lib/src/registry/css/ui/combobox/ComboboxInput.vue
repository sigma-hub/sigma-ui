<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { ComboboxInput, type ComboboxInputEmits, type ComboboxInputProps, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<ComboboxInputProps & {
  class?: HTMLAttributes['class'];
}>();

const emits = defineEmits<ComboboxInputEmits>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ComboboxInput
    v-bind="forwarded"
    :class="['sigma-ui-combobox-input', props.class]"
  >
    <slot />
  </ComboboxInput>
</template>

<style>
.sigma-ui-combobox-input {
  display: flex;
  height: 2.25rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid hsl(var(--input));
  background-color: transparent;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.sigma-ui-combobox-input:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring));
}

.sigma-ui-combobox-input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.sigma-ui-combobox-input::file-selector-button {
  border: 0;
  background-color: transparent;
  font-size: 0.875rem;
  font-weight: 500;
}

.sigma-ui-combobox-input::placeholder {
  color: hsl(var(--muted-foreground));
}
</style>
