<script setup lang="ts">

</script>

<template>
  <div
    class="sigma-ui-card__footer"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-card__footer {
  display: flex;
  padding: 0 1.5rem 1.5rem;
  gap: 0.5rem;
}
</style>
