<script setup lang="ts">
import { UnderlineIcon } from '@lucide/vue';
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
@layer components {
  .example-sigma-ui-toggle__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }
}
</style>
