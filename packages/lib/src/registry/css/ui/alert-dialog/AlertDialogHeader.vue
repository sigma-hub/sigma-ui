<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <div
    class="sigma-ui-alert-dialog-header"
    :class="attrs.class"
    data-slot="alert-dialog-header"
  >
    <slot />
  </div>
</template>

<style>
@layer components {
  .sigma-ui-alert-dialog-header {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 2);
    text-align: center;
  }

  @media (width >= 40rem) {
    .sigma-ui-alert-dialog-header {
      text-align: left;
    }
  }
}
</style>
