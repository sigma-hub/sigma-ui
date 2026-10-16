<script setup lang="ts">
import { ShareIcon } from 'lucide-vue-next';
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
  top: 0;
  z-index: 10;
  display: flex;
  height: 57px;
  align-items: center;
  gap: 0.25rem;
  border-bottom: 1px solid hsl(var(--border));
  background-color: hsl(var(--background));
  padding-right: 1rem;
  padding-left: 1rem;
}

.dashboard-ai-playground__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.75rem;
}

button.dashboard-ai-playground__share-button {
  margin-left: auto;
  gap: 0.375rem;
  font-size: 0.875rem;
}

button.dashboard-ai-playground__share-button svg {
  width: 0.875rem;
  height: 0.875rem;
}
</style>
