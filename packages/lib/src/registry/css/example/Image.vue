<script setup lang="ts">
import { ImageIcon } from 'lucide-vue-next';
import { Image } from '@ui/registry/css/ui/image';
</script>

<template>
  <div class="example-image-container">
    <Image
      src="/avatars/avatar-example.png"
      alt="Image"
    />

    <Image alt="Image">
      <template #fallback>
        <div class="example-fallback-container">
          NO IMAGE
        </div>
      </template>
    </Image>

    <Image alt="Image">
      <template #fallback>
        <div class="example-fallback-container">
          <ImageIcon class="example-fallback-icon" />
          no photo
        </div>
      </template>
    </Image>
  </div>
</template>

<style scoped>
.example-image-container {
  display: grid;
  height: 250px;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(120px, 220px));
}

.example-fallback-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: hsl(var(--muted-foreground));
  gap: 0.25rem;
}

.example-fallback-icon {
  width: 50%;
  max-width: 50px;
  height: 50%;
  max-height: 50px;
}
</style>
