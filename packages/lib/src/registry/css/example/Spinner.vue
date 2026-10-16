<script setup lang="ts">
import { Spinner } from '@ui/registry/css/ui/spinner';
</script>

<template>
  <div class="example-spinner">
    <Spinner />
    <Spinner class="example-spinner__md" />
    <Spinner class="example-spinner__lg" />
  </div>
</template>

<style>
.example-spinner {
  display: flex;
  align-items: center;
  color: var(--muted-foreground);
  gap: 1.5rem;
}

.example-spinner .example-spinner__md {
  width: 1.5rem;
  height: 1.5rem;
}

.example-spinner .example-spinner__lg {
  width: 2rem;
  height: 2rem;
  color: var(--primary);
}
</style>
