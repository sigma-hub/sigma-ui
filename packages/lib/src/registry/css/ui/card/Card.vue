<script setup lang="ts">

</script>

<template>
  <div
    class="sigma-ui-card"
    :class="[$attrs.class]"
    data-slot="card"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background-color: var(--card);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  color: var(--card-foreground);
}
</style>
