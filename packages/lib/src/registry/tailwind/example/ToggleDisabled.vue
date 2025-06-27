<script setup lang="ts">
import { UnderlineIcon } from 'lucide-vue-next';
import { Toggle } from '@ui/registry/tailwind/ui/toggle';
</script>

<template>
  <Toggle
    aria-label="Toggle underline"
    disabled
  >
    <UnderlineIcon class="w-4 h-4" />
  </Toggle>
</template>
