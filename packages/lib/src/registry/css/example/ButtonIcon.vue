<script setup lang="ts">
import { ChevronRightIcon } from '@lucide/vue';
import { Button } from '@ui/registry/css/ui/button';
</script>

<template>
  <Button
    variant="outline"
    size="icon"
  >
    <ChevronRightIcon class="example-sigma-ui-button-icon" />
  </Button>
</template>

<style>
.example-sigma-ui-button-icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}
</style>
