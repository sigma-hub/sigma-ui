<script setup lang="ts">
import { TriangleIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@ui/registry/css/ui/tooltip';
import { primaryNavItems, secondaryNavItems } from '../data';
</script>

<template>
  <aside class="dashboard-ai-playground__sidebar">
    <div class="dashboard-ai-playground__brand">
      <Button
        variant="outline"
        size="icon"
        aria-label="Home"
      >
        <TriangleIcon />
      </Button>
    </div>
    <nav class="dashboard-ai-playground__nav">
      <TooltipProvider
        v-for="item in primaryNavItems"
        :key="item.label"
      >
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="dashboard-ai-playground__nav-button"
              :class="{ 'dashboard-ai-playground__nav-button--active': item.isActive }"
              :aria-label="item.label"
            >
              <component :is="item.icon" />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            :side-offset="5"
          >
            {{ item.label }}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
    <nav class="dashboard-ai-playground__nav dashboard-ai-playground__nav--end">
      <TooltipProvider
        v-for="item in secondaryNavItems"
        :key="item.label"
      >
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="dashboard-ai-playground__nav-button dashboard-ai-playground__nav-button--pinned"
              :aria-label="item.label"
            >
              <component :is="item.icon" />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            :side-offset="5"
          >
            {{ item.label }}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
  </aside>
</template>

<style>
.dashboard-ai-playground__sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  display: flex;
  height: 100%;
  flex-direction: column;
  border-right: 1px solid var(--border);
}

.dashboard-ai-playground__brand {
  border-bottom: 1px solid var(--border);
  padding: 0.5rem;
}

.dashboard-ai-playground__brand svg {
  width: 1.25rem;
  height: 1.25rem;
  fill: var(--foreground);
}

.dashboard-ai-playground__nav {
  display: grid;
  gap: 0.25rem;
  padding: 0.5rem;
}

.dashboard-ai-playground__nav--end {
  margin-top: auto;
}

button.dashboard-ai-playground__nav-button--pinned {
  margin-top: auto;
}

button.dashboard-ai-playground__nav-button svg {
  width: 1.25rem;
  height: 1.25rem;
}

button.dashboard-ai-playground__nav-button--active {
  background-color: var(--muted);
}
</style>
