<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <h5
    class="sigma-ui-alert-title"
    :class="attrs.class"
    data-slot="alert-title"
  >
    <slot />
  </h5>
</template>

<style>
.sigma-ui-alert-title {
  margin-bottom: calc(var(--spacing) * 1);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1;
}
</style>
