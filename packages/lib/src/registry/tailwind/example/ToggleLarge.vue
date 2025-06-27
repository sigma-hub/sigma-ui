<script setup lang="ts">
import { ItalicIcon } from 'lucide-vue-next';
import { Toggle } from '@ui/registry/tailwind/ui/toggle';
</script>

<template>
  <Toggle
    size="lg"
    aria-label="Toggle italic"
  >
    <ItalicIcon class="w-4 h-4" />
  </Toggle>
</template>
