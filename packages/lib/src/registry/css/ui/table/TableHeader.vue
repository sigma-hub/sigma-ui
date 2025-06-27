<script setup lang="ts">

</script>

<template>
  <thead
    class="sigma-ui-table-header"
    :class="[$attrs.class]"
  >
    <slot />
  </thead>
</template>

<style>
.sigma-ui-table-header tr {
  border-bottom: 1px solid hsl(var(--border));
}
</style>
