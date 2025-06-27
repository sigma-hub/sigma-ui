<script setup lang="ts">
import { ChevronRightIcon } from 'lucide-vue-next';
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
  width: 1rem;
  height: 1rem;
}
</style>
