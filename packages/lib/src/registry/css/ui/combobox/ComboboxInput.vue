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
    data-slot="combobox-input"
    v-bind="forwarded"
    :class="['sigma-ui-combobox-input', props.class]"
  >
    <slot />
  </ComboboxInput>
</template>

<style>
@layer components {
  .sigma-ui-combobox-input {
    display: flex;
    width: 100%;
    height: calc(var(--spacing) * 9);
    padding: calc(var(--spacing) * 1) calc(var(--spacing) * 3);
    border: 1px solid var(--border);
    border-radius: 0.375rem;
    background-color: transparent;
    font-size: 0.875rem;
    line-height: 1.25rem;
    transition-duration: 150ms;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sigma-ui-combobox-input:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
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
    color: var(--muted-foreground);
  }
}
</style>
