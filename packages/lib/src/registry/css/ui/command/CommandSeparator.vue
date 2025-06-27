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
  margin-left: -0.25rem;
  margin-right: -0.25rem;
  height: 1px;
  background-color: hsl(var(--border));
}
</style>
