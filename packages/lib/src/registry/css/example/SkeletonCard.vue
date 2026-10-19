<script lang="ts" setup>
import { Skeleton } from '@ui/registry/css/ui/skeleton';
</script>

<template>
  <div class="example-sigma-ui-skeleton-card">
    <Skeleton class="example-sigma-ui-skeleton-card__image" />
    <div class="example-sigma-ui-skeleton-card__content">
      <Skeleton class="example-sigma-ui-skeleton-card__title" />
      <Skeleton class="example-sigma-ui-skeleton-card__description" />
    </div>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .example-sigma-ui-skeleton-card {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 3);
  }

  .example-sigma-ui-skeleton-card__image {
    width: calc(var(--spacing) * 62.5);
    height: 7.8125rem;
    border-radius: var(--radius);
  }

  .example-sigma-ui-skeleton-card__content {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 2);
  }

  .example-sigma-ui-skeleton-card__title {
    width: calc(var(--spacing) * 62.5);
    height: calc(var(--spacing) * 4);
  }

  .example-sigma-ui-skeleton-card__description {
    width: calc(var(--spacing) * 50);
    height: calc(var(--spacing) * 4);
  }
}
</style>
