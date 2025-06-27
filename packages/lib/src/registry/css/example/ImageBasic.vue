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
.example-image-container {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 250px;
}
</style>
