<script setup lang="ts">
import { AspectRatio } from '@ui/registry/tailwind/ui/aspect-ratio';
</script>

<template>
  <div class="w-full max-w-sm">
    <AspectRatio :ratio="16 / 9">
      <div class="flex size-full items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
        16:9
      </div>
    </AspectRatio>
  </div>
</template>
