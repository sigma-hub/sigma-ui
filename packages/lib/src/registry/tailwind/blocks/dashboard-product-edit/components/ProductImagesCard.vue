<script setup lang="ts">
import { UploadIcon } from '@lucide/vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';
import { mainProductImage, productThumbnails } from '../data';
</script>

<template>
  <Card class="overflow-hidden">
    <CardHeader>
      <CardTitle>Product imgs</CardTitle>
      <CardDescription>
        Lipsum dolor sit amet, consectetur adipiscing elit
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-2">
        <img
          :alt="mainProductImage.alt"
          class="aspect-square w-full rounded-md object-cover"
          :height="mainProductImage.size"
          :src="mainProductImage.src"
          :width="mainProductImage.size"
        >
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="(thumbnail, thumbnailIndex) in productThumbnails"
            :key="thumbnailIndex"
          >
            <img
              :alt="thumbnail.alt"
              class="aspect-square w-full rounded-md object-cover"
              :height="thumbnail.size"
              :src="thumbnail.src"
              :width="thumbnail.size"
            >
          </button>
          <button class="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
            <UploadIcon class="h-4 w-4 text-muted-foreground" />
            <span class="sr-only">Upload</span>
          </button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
