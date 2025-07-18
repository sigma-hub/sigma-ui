<script setup lang="ts">

</script>

<template>
  <div
    class="sigma-ui-card__content"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-card__content {
  padding: 0 1.5rem 1.5rem;
}
</style>
