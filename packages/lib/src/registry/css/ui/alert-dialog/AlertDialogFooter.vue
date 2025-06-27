<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <div
    class="sigma-ui-alert-dialog-footer"
    :class="attrs.class"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-alert-dialog-footer {
  display: flex;
  flex-direction: column-reverse;
}

@media (min-width: 640px) {
  .sigma-ui-alert-dialog-footer {
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.5rem;
  }
}
</style>
