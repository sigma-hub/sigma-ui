<script setup lang="ts">
import { ItalicIcon } from '@lucide/vue';
import { Toggle } from '@ui/registry/tailwind/ui/toggle';
</script>

<template>
  <Toggle aria-label="Toggle italic">
    <ItalicIcon class="w-4 h-4 mr-2" />
    Italic
  </Toggle>
</template>
