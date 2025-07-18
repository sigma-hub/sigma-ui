<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <div
    class="sigma-ui-alert-dialog-header"
    :class="attrs.class"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-alert-dialog-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
}

@media (width >= 640px) {
  .sigma-ui-alert-dialog-header {
    text-align: left;
  }
}
</style>
