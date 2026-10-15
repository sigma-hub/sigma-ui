<script setup lang="ts">
import { Input } from '@ui/registry/css/ui/input';

/** Current value of the input; use with `v-model`. */
const model = defineModel<string | number>();

defineEmits<{
  /** Emitted when the user changes the value. */
  'update:modelValue': [value: string | number];
}>();
</script>

<template>
  <Input
    v-model="model"
    data-slot="sidebar-input"
    data-sidebar="input"
    class="sigma-ui-sidebar-input"
  />
</template>

<style>
.sigma-ui-input.sigma-ui-sidebar-input {
  width: 100%;
  height: 2rem;
  background-color: var(--background);
  box-shadow: none;
}
</style>
