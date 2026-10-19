<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import type { EmptyStateData } from '../data';

defineProps<EmptyStateData>();
</script>

<template>
  <div class="dashboard-sidebar__empty">
    <div class="dashboard-sidebar__empty-body">
      <h3 class="dashboard-sidebar__empty-title">
        {{ title }}
      </h3>
      <p class="dashboard-sidebar__empty-description">
        {{ description }}
      </p>
      <Button class="dashboard-sidebar__empty-action">
        {{ actionLabel }}
      </Button>
    </div>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .dashboard-sidebar__empty {
    display: flex;
    flex: 1 1 0%;
    align-items: center;
    justify-content: center;
    border: 1px dashed var(--border);
    border-radius: var(--radius);
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  }

  .dashboard-sidebar__empty-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: calc(var(--spacing) * 1);
    text-align: center;
  }

  .dashboard-sidebar__empty-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 2rem;
  }

  .dashboard-sidebar__empty-description {
    margin: 0;
    color: var(--muted-foreground);
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .dashboard-sidebar__empty-action {
    margin-top: calc(var(--spacing) * 4);
  }
}
</style>
