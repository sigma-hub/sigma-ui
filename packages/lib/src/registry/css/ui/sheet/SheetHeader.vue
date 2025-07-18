<script setup lang="ts">

</script>

<template>
  <div
    class="sigma-ui-sheet-header"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-sheet-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
}

@media (width >= 640px) {
  .sigma-ui-sheet-header {
    text-align: left;
  }
}
</style>
