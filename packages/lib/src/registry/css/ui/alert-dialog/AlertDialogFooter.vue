<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <div
    class="sigma-ui-alert-dialog-footer"
    :class="attrs.class"
    data-slot="alert-dialog-footer"
  >
    <slot />
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-alert-dialog-footer {
    display: flex;
    flex-direction: column-reverse;
  }

  @media (width >= 40rem) {
    .sigma-ui-alert-dialog-footer {
      flex-direction: row;
      justify-content: flex-end;
      gap: calc(var(--spacing) * 2);
    }
  }
}
</style>
