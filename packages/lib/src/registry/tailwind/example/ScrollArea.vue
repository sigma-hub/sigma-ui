<script setup lang="ts">
import { ScrollArea } from '@ui/registry/tailwind/ui/scroll-area';
import { Separator } from '@ui/registry/tailwind/ui/separator';

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);
</script>

<template>
  <ScrollArea class="h-72 w-48 rounded-md border">
    <div class="p-4">
      <h4 class="mb-4 text-sm font-medium leading-none">
        Tags
      </h4>

      <div
        v-for="tag in tags"
        :key="tag"
      >
        <div class="text-sm">
          {{ tag }}
        </div>
        <Separator class="my-2" />
      </div>
    </div>
  </ScrollArea>
</template>
