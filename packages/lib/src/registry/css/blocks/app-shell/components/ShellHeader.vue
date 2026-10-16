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
.app-shell__header {
  display: flex;
  height: 3.5rem;
  flex-shrink: 0;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid var(--border);
  gap: 0.5rem;
}

.app-shell__separator.app-shell__separator {
  height: 1rem;
}

.app-shell__page-title {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
