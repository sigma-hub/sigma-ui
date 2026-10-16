<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';

defineProps<{
  title: string;
  description: string;
  action: string;
}>();
</script>

<template>
  <div class="dashboard-sidebar__empty">
    <div class="dashboard-sidebar__empty-copy">
      <h3 class="dashboard-sidebar__empty-title">
        {{ title }}
      </h3>
      <p class="dashboard-sidebar__empty-description">
        {{ description }}
      </p>
      <Button class="dashboard-sidebar__empty-action">
        {{ action }}
      </Button>
    </div>
  </div>
</template>

<style>
.dashboard-sidebar__empty {
  display: flex;
  flex: 1 1 0%;
  align-items: center;
  justify-content: center;
  border: 1px dashed hsl(var(--border));
  border-radius: var(--radius);
  box-shadow: 0 1px 2px 0 hsl(var(--foreground) / 5%);
}

.dashboard-sidebar__empty-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  text-align: center;
}

.dashboard-sidebar__empty-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 2rem;
}

.dashboard-sidebar__empty-description {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: hsl(var(--muted-foreground));
}

.dashboard-sidebar__empty-action {
  margin-top: 1rem;
}
</style>
