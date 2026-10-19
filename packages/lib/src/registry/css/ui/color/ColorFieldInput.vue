<script setup lang="ts">
import { useAttrs } from 'vue';

import { ColorFieldInput, type ColorFieldInputProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ColorFieldInputProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ColorFieldInput
    data-slot="color-field-input"
    class="sigma-ui-color-field-input"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  />
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-color-field-input {
    display: flex;
    width: 100%;
    min-width: 0;
    height: calc(var(--spacing) * 9);
    border: 1px solid var(--input);
    border-radius: var(--radius-md);
    background-color: transparent;
    font-size: 1rem;
    padding-block: calc(var(--spacing) * 1);
    padding-inline: calc(var(--spacing) * 3);
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
}
</style>
