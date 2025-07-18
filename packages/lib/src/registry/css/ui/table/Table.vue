<script setup lang="ts">

</script>

<template>
  <div class="sigma-ui-table-wrapper">
    <table
      class="sigma-ui-table"
      :class="[$attrs.class]"
    >
      <slot />
    </table>
  </div>
</template>

<style>
.sigma-ui-table-wrapper {
  position: relative;
  overflow: auto;
  width: 100%;
}

.sigma-ui-table {
  width: 100%;
  caption-side: bottom;
  font-size: 0.875rem;
}
</style>
