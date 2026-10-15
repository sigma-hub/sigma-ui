<script setup lang="ts">

</script>

<template>
  <thead
    class="sigma-ui-table-header"
    :class="[$attrs.class]"
    data-slot="table-header"
  >
    <slot />
  </thead>
</template>

<style>
.sigma-ui-table-header tr {
  border-bottom: 1px solid var(--border);
}
</style>
