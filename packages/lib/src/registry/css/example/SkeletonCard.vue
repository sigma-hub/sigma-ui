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
.example-sigma-ui-skeleton-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.example-sigma-ui-skeleton-card__image {
  width: 15.625rem;
  height: 7.8125rem;
  border-radius: var(--radius);
}

.example-sigma-ui-skeleton-card__content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.example-sigma-ui-skeleton-card__title {
  width: 15.625rem;
  height: 1rem;
}

.example-sigma-ui-skeleton-card__description {
  width: 12.5rem;
  height: 1rem;
}
</style>
