<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <h5
    class="sigma-ui-alert-title"
    :class="attrs.class"
  >
    <slot />
  </h5>
</template>

<style>
.sigma-ui-alert-title {
  margin-bottom: 0.25rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.025em;
}
</style>
