<script setup lang="ts">
import { ItalicIcon } from 'lucide-vue-next';
import { Toggle } from '@ui/registry/css/ui/toggle';
</script>

<template>
  <Toggle
    size="sm"
    aria-label="Toggle italic"
  >
    <ItalicIcon class="example-sigma-ui-toggle__icon" />
  </Toggle>
</template>

<style>
.example-sigma-ui-toggle__icon {
  width: 1rem;
  height: 1rem;
}
</style>
