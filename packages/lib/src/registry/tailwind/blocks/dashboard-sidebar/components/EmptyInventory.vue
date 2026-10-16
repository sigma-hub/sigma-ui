<script setup lang="ts">
import { Button } from '@ui/registry/tailwind/ui/button';

defineProps<{
  title: string;
  description: string;
  action: string;
}>();
</script>

<template>
  <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
    <div class="flex flex-col items-center gap-1 text-center">
      <h3 class="text-2xl font-bold tracking-tight">
        {{ title }}
      </h3>
      <p class="text-sm text-muted-foreground">
        {{ description }}
      </p>
      <Button class="mt-4">
        {{ action }}
      </Button>
    </div>
  </div>
</template>
