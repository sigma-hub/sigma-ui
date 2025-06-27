<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <div
    class="sigma-ui-alert-description"
    :class="attrs.class"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-alert-description {
  font-size: 0.875rem;
}

.sigma-ui-alert-description p {
  line-height: 1.65;
}
</style>
