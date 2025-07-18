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
  width: 250px;
  height: 300px;
  align-items: center;
  justify-content: center;
}

.example-image-fallback-icon-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image:
    linear-gradient(90deg, transparent 95%, hsl(var(--foreground) / 10%) 95%),
    linear-gradient(0deg, transparent 95%, hsl(var(--foreground) / 10%) 95%);
  background-size: 16px 16px;
  color: hsl(var(--muted-foreground));
  gap: 0.25rem;
}

.example-image-fallback-icon {
  width: 50%;
  max-width: 50px;
  height: 50%;
  max-height: 50px;
}
</style>
