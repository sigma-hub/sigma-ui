<script setup lang="ts">
import { Spinner } from '@ui/registry/tailwind/ui/spinner';
</script>

<template>
  <div class="flex items-center gap-6 text-muted-foreground">
    <Spinner />
    <Spinner class="size-6" />
    <Spinner class="size-8 text-primary" />
  </div>
</template>
