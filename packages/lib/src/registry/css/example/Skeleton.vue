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
.example-sigma-ui-skeleton {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.example-sigma-ui-skeleton__avatar {
  height: 3rem;
  width: 3rem;
  border-radius: var(--radius-full);
}

.example-sigma-ui-skeleton__content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.example-sigma-ui-skeleton__title {
  height: 1rem;
  width: 15.625rem;
}

.example-sigma-ui-skeleton__description {
  height: 1rem;
  width: 12.5rem;
}
</style>
