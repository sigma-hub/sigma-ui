<script setup lang="ts">
import { BoldIcon } from 'lucide-vue-next';
import { Toggle } from '@ui/registry/css/ui/toggle';
</script>

<template>
  <Toggle aria-label="Toggle bold">
    <BoldIcon class="example-sigma-ui-toggle__icon" />
  </Toggle>
</template>

<style>
.example-sigma-ui-toggle__icon {
  width: 1rem;
  height: 1rem;
}
</style>
