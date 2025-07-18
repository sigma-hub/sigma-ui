<script setup lang="ts">

</script>

<template>
  <div
    class="sigma-ui-card"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-card {
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  background-color: hsl(var(--card));
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  color: hsl(var(--card-foreground));
}
</style>
