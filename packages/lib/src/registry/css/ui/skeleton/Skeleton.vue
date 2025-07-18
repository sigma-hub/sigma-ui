<script setup lang="ts">
</script>

<template>
  <div
    class="sigma-ui-skeleton"
    :class="[$attrs.class]"
  />
</template>

<style>
.sigma-ui-skeleton {
  border-radius: var(--radius-md);
  animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  background-color: hsl(var(--muted));
}

@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}
</style>
