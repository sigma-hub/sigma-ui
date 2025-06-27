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
  margin: 0.25rem -0.25rem;
  height: 1px;
  background-color: hsl(var(--muted));
}
</style>
