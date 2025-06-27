<script setup lang="ts">
import type { ComboboxEmptyProps } from 'reka-ui';
import { ComboboxEmpty } from 'reka-ui';

const props = defineProps<ComboboxEmptyProps>();
</script>

<template>
  <ComboboxEmpty
    v-bind="props"
    class="sigma-ui-command-empty"
  >
    <slot />
  </ComboboxEmpty>
</template>

<style>
.sigma-ui-command-empty {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  text-align: center;
  font-size: var(--text-sm);
}
</style>
