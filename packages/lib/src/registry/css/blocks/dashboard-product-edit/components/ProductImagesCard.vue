<script setup lang="ts">
import { UploadIcon } from '@lucide/vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import { mainProductImage, productThumbnails } from '../data';
</script>

<template>
  <Card class="dashboard-product-edit__images-card">
    <CardHeader>
      <CardTitle>Product imgs</CardTitle>
      <CardDescription>
        Lipsum dolor sit amet, consectetur adipiscing elit
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="dashboard-product-edit__image-grid">
        <img
          :alt="mainProductImage.alt"
          class="dashboard-product-edit__image"
          :height="mainProductImage.size"
          :src="mainProductImage.src"
          :width="mainProductImage.size"
        >
        <div class="dashboard-product-edit__thumbnails">
          <button
            v-for="(thumbnail, thumbnailIndex) in productThumbnails"
            :key="thumbnailIndex"
            class="dashboard-product-edit__thumbnail"
          >
            <img
              :alt="thumbnail.alt"
              class="dashboard-product-edit__image"
              :height="thumbnail.size"
              :src="thumbnail.src"
              :width="thumbnail.size"
            >
          </button>
          <button class="dashboard-product-edit__upload">
            <UploadIcon />
            <span class="dashboard-product-edit__visually-hidden">Upload</span>
          </button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style>
@layer components {
  .dashboard-product-edit__images-card {
    overflow: hidden;
  }

  .dashboard-product-edit__image-grid {
    display: grid;
    gap: calc(var(--spacing) * 2);
  }

  .dashboard-product-edit__image {
    display: block;
    width: 100%;
    border-radius: var(--radius-md);
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }

  .dashboard-product-edit__thumbnails {
    display: grid;
    gap: calc(var(--spacing) * 2);
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .dashboard-product-edit__thumbnail,
  .dashboard-product-edit__upload {
    display: block;
    width: 100%;
    padding: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
  }

  .dashboard-product-edit__upload {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed var(--border);
    border-radius: var(--radius-md);
    aspect-ratio: 1 / 1;
  }

  .dashboard-product-edit__upload svg {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    color: var(--muted-foreground);
  }

  .dashboard-product-edit__visually-hidden {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    border-width: 0;
    margin: -1px;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
}
</style>
