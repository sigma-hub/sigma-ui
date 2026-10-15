<script setup lang="ts">

</script>

<template>
  <h3
    class="sigma-ui-card__title"
    :class="[$attrs.class]"
    data-slot="card-title"
  >
    <slot />
  </h3>
</template>

<style>
.sigma-ui-card__title {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1;
}
</style>
