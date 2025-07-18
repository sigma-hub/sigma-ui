<script setup lang="ts">
import { Image } from '@ui/registry/css/ui/image';
</script>

<template>
  <div class="example-image-container">
    <Image
      src="/avatars/avatar-example.png"
      alt="Image"
      glow
    />
  </div>
</template>

<style scoped>
.example-image-container {
  display: flex;
  width: 250px;
  height: 300px;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>
