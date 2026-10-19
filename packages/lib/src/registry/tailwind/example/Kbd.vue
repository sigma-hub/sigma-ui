<script setup lang="ts">
import { Kbd, KbdGroup } from '@ui/registry/tailwind/ui/kbd';
</script>

<template>
  <div class="flex items-center gap-4 text-sm">
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <Kbd>B</Kbd>
    </KbdGroup>
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  </div>
</template>
