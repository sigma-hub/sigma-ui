<script setup lang="ts">
import { AspectRatio } from '@ui/registry/css/ui/aspect-ratio';
</script>

<template>
  <div class="example-aspect-ratio">
    <AspectRatio :ratio="16 / 9">
      <div class="example-aspect-ratio__fill">
        16:9
      </div>
    </AspectRatio>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .example-aspect-ratio {
    width: 100%;
    max-width: 24rem;
  }

  .example-aspect-ratio__fill {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    background-color: var(--muted);
    color: var(--muted-foreground);
    font-size: 0.875rem;
  }
}
</style>
