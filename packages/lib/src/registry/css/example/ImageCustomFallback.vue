<script setup lang="ts">
import { ImageIcon } from 'lucide-vue-next';
import { Image } from '@ui/registry/css/ui/image';
</script>

<template>
  <div class="example-image-container">
    <Image
      class="example-image"
      alt="Image"
    >
      <template #fallback>
        <div class="example-image-fallback-icon-container">
          <ImageIcon class="example-image-fallback-icon" />
          no photo
        </div>
      </template>
    </Image>
  </div>
</template>

<style scoped>
.example-image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 250px;
}

.example-image-fallback-icon-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  color: hsl(var(--muted-foreground));
  background-image:
    linear-gradient(90deg, transparent 95%, hsl(var(--foreground) / 10%) 95%),
    linear-gradient(0deg, transparent 95%, hsl(var(--foreground) / 10%) 95%);
  background-size: 16px 16px;
  width: 100%;
  height: 100%;
}

.example-image-fallback-icon {
  width: 50%;
  max-width: 50px;
  height: 50%;
  max-height: 50px;
}
</style>
