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
  margin-left: -0.25rem;
  margin-right: -0.25rem;
  height: 1px;
  background-color: hsl(var(--border));
}
</style>
