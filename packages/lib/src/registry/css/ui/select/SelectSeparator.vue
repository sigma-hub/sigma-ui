<script setup lang="ts">
import { SelectSeparator, type SelectSeparatorProps } from 'reka-ui';

const props = defineProps<SelectSeparatorProps>();
</script>

<template>
  <SelectSeparator
    v-bind="props"
    class="sigma-ui-select-separator"
  />
</template>

<style>
.sigma-ui-select-separator {
  height: 1px;
  margin: 0.25rem -0.25rem;
  background-color: hsl(var(--muted));
}
</style>
