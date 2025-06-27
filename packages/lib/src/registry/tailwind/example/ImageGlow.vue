<script setup lang="ts">
import { Image } from '@ui/registry/tailwind/ui/image';
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-16 h-[300px] w-[250px] sm:flex-row">
    <Image
      src="/avatars/avatar-example.png"
      alt="Image"
      glow
    />
  </div>
</template>
