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
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}
</style>
