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
  gap: calc(var(--spacing) * 6);
}

.example-spinner .example-spinner__md {
  width: calc(var(--spacing) * 6);
  height: calc(var(--spacing) * 6);
}

.example-spinner .example-spinner__lg {
  width: calc(var(--spacing) * 8);
  height: calc(var(--spacing) * 8);
  color: var(--primary);
}
</style>
