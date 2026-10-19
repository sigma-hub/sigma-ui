<script setup lang="ts">
import { Separator } from '@ui/registry/css/ui/separator';
import { SidebarTrigger } from '@ui/registry/css/ui/sidebar';

defineProps<{
  title: string;
}>();
</script>

<template>
  <header class="app-shell__header">
    <SidebarTrigger />
    <Separator
      orientation="vertical"
      class="app-shell__separator"
    />
    <span class="app-shell__page-title">{{ title }}</span>
  </header>
</template>

<style>
@layer base, components;

@layer components {
  .app-shell__header {
    display: flex;
    height: calc(var(--spacing) * 14);
    flex-shrink: 0;
    align-items: center;
    padding: 0 calc(var(--spacing) * 4);
    border-bottom: 1px solid var(--border);
    gap: calc(var(--spacing) * 2);
  }

  .app-shell__separator.app-shell__separator {
    height: calc(var(--spacing) * 4);
  }

  .app-shell__page-title {
    font-size: 0.875rem;
    font-weight: 500;
  }
}
</style>
