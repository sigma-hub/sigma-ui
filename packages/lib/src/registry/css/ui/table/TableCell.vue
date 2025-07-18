<script setup lang="ts">

</script>

<template>
  <td
    class="sigma-ui-table-cell"
    :class="[$attrs.class]"
  >
    <slot />
  </td>
</template>

<style>
.sigma-ui-table-cell {
  padding: 1rem;
  vertical-align: middle;
}

.sigma-ui-table-cell:has([role="checkbox"]) {
  padding-right: 0;
}
</style>
