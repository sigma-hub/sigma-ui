<script setup lang="ts">
import { ShareIcon } from '@lucide/vue';
import { Button } from '@ui/registry/css/ui/button';
import ConfigurationDrawer from './ConfigurationDrawer.vue';
</script>

<template>
  <header class="dashboard-ai-playground__header">
    <h1 class="dashboard-ai-playground__title">
      Playground
    </h1>
    <ConfigurationDrawer />
    <Button
      variant="outline"
      size="sm"
      class="dashboard-ai-playground__share-button"
    >
      <ShareIcon />
      Share
    </Button>
  </header>
</template>

<style>
.dashboard-ai-playground__header {
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  height: 57px;
  align-items: center;
  padding-right: calc(var(--spacing) * 4);
  padding-left: calc(var(--spacing) * 4);
  border-bottom: 1px solid var(--border);
  background-color: var(--background);
  gap: calc(var(--spacing) * 1);
}

.dashboard-ai-playground__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.75rem;
}

button.dashboard-ai-playground__share-button {
  margin-left: auto;
  font-size: 0.875rem;
  gap: calc(var(--spacing) * 1.5);
}

button.dashboard-ai-playground__share-button svg {
  width: calc(var(--spacing) * 3.5);
  height: calc(var(--spacing) * 3.5);
}
</style>
