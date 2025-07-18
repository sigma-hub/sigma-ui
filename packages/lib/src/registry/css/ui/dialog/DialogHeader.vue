<script setup lang="ts">

;
</script>

<template>
  <div
    class="sigma-ui-dialog-header"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-dialog-header {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  text-align: center;
}

@media (width >= 640px) {
  .sigma-ui-dialog-header {
    text-align: left;
  }
}
</style>
