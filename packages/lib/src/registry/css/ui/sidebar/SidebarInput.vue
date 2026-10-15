<script setup lang="ts">
import { Input } from '@ui/registry/css/ui/input';

const model = defineModel<string | number>();
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
  background-color: hsl(var(--background));
  box-shadow: none;
}
</style>
