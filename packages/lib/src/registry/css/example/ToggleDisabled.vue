<script setup lang="ts">
import { UnderlineIcon } from 'lucide-vue-next';
import { Toggle } from '@ui/registry/css/ui/toggle';
</script>

<template>
  <Toggle
    aria-label="Toggle underline"
    disabled
  >
    <UnderlineIcon class="example-sigma-ui-toggle__icon" />
  </Toggle>
</template>

<style>
.example-sigma-ui-toggle__icon {
  width: 1rem;
  height: 1rem;
}
</style>
