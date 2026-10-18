<script setup lang="ts">
import { ShareIcon } from '@lucide/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import ConfigurationDrawer from './ConfigurationDrawer.vue';
</script>

<template>
  <header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
    <h1 class="text-xl font-semibold">
      Playground
    </h1>
    <ConfigurationDrawer />
    <Button
      variant="outline"
      size="sm"
      class="ml-auto gap-1.5 text-sm"
    >
      <ShareIcon class="size-3.5" />
      Share
    </Button>
  </header>
</template>
