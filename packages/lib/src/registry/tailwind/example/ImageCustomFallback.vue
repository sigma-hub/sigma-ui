<script setup lang="ts">
import { ImageIcon } from 'lucide-vue-next';
import { Image } from '@ui/registry/tailwind/ui/image';
</script>

<template>
  <div class="flex items-center justify-center h-[300px] w-[250px]">
    <Image
      alt="Image"
    >
      <template #fallback>
        <div
          class="flex flex-col gap-1 items-center justify-center text-muted-foreground w-full h-full bg-[length:16px_16px] bg-[image:linear-gradient(90deg,transparent_95%,hsl(var(--foreground)/10%)_95%),linear-gradient(0deg,transparent_95%,hsl(var(--foreground)/10%)_95%)]"
        >
          <ImageIcon class="w-[50%] max-w-[50px] h-[50%] max-h-[50px]" />
          no photo
        </div>
      </template>
    </Image>
  </div>
</template>
