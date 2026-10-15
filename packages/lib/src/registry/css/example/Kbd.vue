<script setup lang="ts">
import { Kbd, KbdGroup } from '@ui/registry/css/ui/kbd';
</script>

<template>
  <div class="example-kbd">
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

<style>
.example-kbd {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  gap: 1rem;
}
</style>
