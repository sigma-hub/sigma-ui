<script setup lang="ts">
import { ChevronLeftIcon } from '@lucide/vue';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Button } from '@ui/registry/tailwind/ui/button';
</script>

<template>
  <div class="flex items-center gap-4">
    <Button
      variant="outline"
      size="icon"
      class="h-7 w-7"
    >
      <ChevronLeftIcon class="h-4 w-4" />
      <span class="sr-only">Back</span>
    </Button>
    <h1 class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
      Pro Controller
    </h1>
    <Badge
      variant="outline"
      class="ml-auto sm:ml-0"
    >
      In stock
    </Badge>
    <div class="hidden items-center gap-2 md:ml-auto md:flex">
      <Button
        variant="outline"
        size="sm"
      >
        Discard
      </Button>
      <Button size="sm">
        Save Product
      </Button>
    </div>
  </div>
</template>
