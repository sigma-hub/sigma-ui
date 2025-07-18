<script setup lang="ts">

</script>

<template>
  <div
    class="sigma-ui-card__header"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-card__header {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 0.375rem;
}
</style>
