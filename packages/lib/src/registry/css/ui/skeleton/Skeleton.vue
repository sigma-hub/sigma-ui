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
  background-color: hsl(var(--muted));
  animation: skeletonPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes skeletonPulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
