<script setup lang="ts">
import { Skeleton } from '@ui/registry/css/ui/skeleton';
</script>

<template>
  <div class="example-sigma-ui-skeleton">
    <Skeleton class="example-sigma-ui-skeleton__avatar" />
    <div class="example-sigma-ui-skeleton__content">
      <Skeleton class="example-sigma-ui-skeleton__title" />
      <Skeleton class="example-sigma-ui-skeleton__description" />
    </div>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .example-sigma-ui-skeleton {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 4);
  }

  .example-sigma-ui-skeleton__avatar {
    width: calc(var(--spacing) * 12);
    height: calc(var(--spacing) * 12);
    border-radius: var(--radius-full);
  }

  .example-sigma-ui-skeleton__content {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 2);
  }

  .example-sigma-ui-skeleton__title {
    width: calc(var(--spacing) * 62.5);
    height: calc(var(--spacing) * 4);
  }

  .example-sigma-ui-skeleton__description {
    width: calc(var(--spacing) * 50);
    height: calc(var(--spacing) * 4);
  }
}
</style>
