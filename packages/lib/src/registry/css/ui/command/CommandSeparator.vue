<script setup lang="ts">
import type { ComboboxSeparatorProps } from 'reka-ui';
import { ComboboxSeparator } from 'reka-ui';

const props = defineProps<ComboboxSeparatorProps>();
</script>

<template>
  <ComboboxSeparator
    v-bind="props"
    class="sigma-ui-command-separator"
  >
    <slot />
  </ComboboxSeparator>
</template>

<style>
.sigma-ui-command-separator {
  height: 1px;
  margin-right: -0.25rem;
  margin-left: -0.25rem;
  background-color: hsl(var(--border));
}
</style>
