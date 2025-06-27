<script setup lang="ts">
import { BoldIcon } from 'lucide-vue-next';
import { Toggle } from '@ui/registry/tailwind/ui/toggle';
</script>

<template>
  <Toggle aria-label="Toggle bold">
    <BoldIcon class="h-4 w-4" />
  </Toggle>
</template>
