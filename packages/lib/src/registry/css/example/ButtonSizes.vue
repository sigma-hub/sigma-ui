<script setup lang="ts">
import { PlusIcon } from '@lucide/vue';
import { Button } from '@ui/registry/css/ui/button';
</script>

<template>
  <div class="example-button-sizes">
    <Button size="xs">
      Extra small
    </Button>
    <Button size="sm">
      Small
    </Button>
    <Button>Default</Button>
    <Button size="lg">
      Large
    </Button>
    <Button
      size="icon-xs"
      variant="outline"
      aria-label="Extra small icon"
    >
      <PlusIcon />
    </Button>
    <Button
      size="icon-sm"
      variant="outline"
      aria-label="Small icon"
    >
      <PlusIcon />
    </Button>
    <Button
      size="icon"
      variant="outline"
      aria-label="Icon"
    >
      <PlusIcon />
    </Button>
    <Button
      size="icon-lg"
      variant="outline"
      aria-label="Large icon"
    >
      <PlusIcon />
    </Button>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .example-button-sizes {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: calc(var(--spacing) * 3);
  }
}
</style>
