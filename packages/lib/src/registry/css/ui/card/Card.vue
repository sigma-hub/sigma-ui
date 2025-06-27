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
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
</style>
