<script setup lang="ts">

</script>

<template>
  <tfoot
    class="sigma-ui-table-footer"
    :class="[$attrs.class]"
  >
    <slot />
  </tfoot>
</template>

<style>
.sigma-ui-table-footer {
  border-top: 1px solid hsl(var(--border));
  background-color: hsl(var(--muted) / 0.5);
  font-weight: 500;
}

.sigma-ui-table-footer > tr:last-child {
  border-bottom: 0;
}
</style>
