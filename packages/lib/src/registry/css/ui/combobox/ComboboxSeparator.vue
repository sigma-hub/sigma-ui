<script setup lang="ts">
import type { ComboboxSeparatorProps } from 'reka-ui';
import { ComboboxSeparator } from 'reka-ui';

const props = defineProps<ComboboxSeparatorProps>();
</script>

<template>
  <ComboboxSeparator
    v-bind="{ ...props, ...$attrs }"
    :class="['sigma-ui-combobox-separator', $attrs.class]"
  >
    <slot />
  </ComboboxSeparator>
</template>

<style>
.sigma-ui-combobox-separator {
  height: 1px;
  margin-right: -0.25rem;
  margin-left: -0.25rem;
  background-color: hsl(var(--border));
}
</style>
