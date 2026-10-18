<script setup lang="ts">
import { ItalicIcon } from '@lucide/vue';
import { Toggle } from '@ui/registry/css/ui/toggle';
</script>

<template>
  <Toggle
    size="lg"
    aria-label="Toggle italic"
  >
    <ItalicIcon class="example-sigma-ui-toggle__icon" />
  </Toggle>
</template>

<style>
.example-sigma-ui-toggle__icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}
</style>
