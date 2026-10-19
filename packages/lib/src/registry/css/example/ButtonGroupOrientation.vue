<script setup lang="ts">
import { MinusIcon, PlusIcon } from '@lucide/vue';
import { Button } from '@ui/registry/css/ui/button';
import { ButtonGroup } from '@ui/registry/css/ui/button-group';
</script>

<template>
  <ButtonGroup
    orientation="vertical"
    aria-label="Zoom controls"
  >
    <Button
      variant="outline"
      size="icon"
      aria-label="Zoom in"
    >
      <PlusIcon class="example-button-group-orientation__icon" />
    </Button>
    <Button
      variant="outline"
      size="icon"
      aria-label="Zoom out"
    >
      <MinusIcon class="example-button-group-orientation__icon" />
    </Button>
  </ButtonGroup>
</template>

<style>
@layer components {
  .example-button-group-orientation__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }
}
</style>
