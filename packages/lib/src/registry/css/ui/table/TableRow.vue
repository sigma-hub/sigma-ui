<script setup lang="ts">

</script>

<template>
  <tr
    class="sigma-ui-table-row"
    :class="[$attrs.class]"
  >
    <slot />
  </tr>
</template>

<style>
.sigma-ui-table-row {
  border-bottom: 1px solid hsl(var(--border));
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.sigma-ui-table-row:hover {
  background-color: hsl(var(--muted) / 0.5);
}

.sigma-ui-table-row[data-state="selected"] {
  background-color: hsl(var(--muted));
}
</style>
