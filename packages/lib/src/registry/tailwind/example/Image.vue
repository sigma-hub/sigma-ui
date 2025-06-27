<script setup lang="ts">
import { ImageIcon } from 'lucide-vue-next';
import { Image } from '@ui/registry/tailwind/ui/image';
</script>

<template>
  <div class="grid grid-cols-[repeat(3,minmax(120px,220px))] gap-4 items-center justify-center h-[250px]">
    <Image
      src="/avatars/avatar-example.png"
      alt="Image"
    />

    <Image alt="Image">
      <template #fallback>
        <div class="flex flex-col gap-2 items-center justify-center text-muted-foreground">
          NO IMAGE
        </div>
      </template>
    </Image>

    <Image alt="Image">
      <template #fallback>
        <div class="flex flex-col gap-1 items-center justify-center text-muted-foreground">
          <ImageIcon class="w-[50%] max-w-[50px] h-[50%] max-h-[50px]" />
          no photo
        </div>
      </template>
    </Image>
  </div>
</template>
