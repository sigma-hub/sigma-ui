<script setup lang="ts">

</script>

<template>
  <caption
    class="sigma-ui-table-caption"
    :class="[$attrs.class]"
  >
    <slot />
  </caption>
</template>

<style>
.sigma-ui-table-caption {
  margin-top: 1rem;
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
}
</style>
