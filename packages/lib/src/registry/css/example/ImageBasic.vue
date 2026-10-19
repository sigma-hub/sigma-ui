<script setup lang="ts">
import { Image } from '@ui/registry/css/ui/image';
</script>

<template>
  <div class="example-image-container">
    <Image
      src="/avatars/avatar-example.png"
      alt="Image"
    />
  </div>
</template>

<style scoped>
@layer base, components;

@layer components {
  .example-image-container {
    display: flex;
    width: 250px;
    height: 300px;
    align-items: center;
    justify-content: center;
    gap: calc(var(--spacing) * 4);
  }
}
</style>
