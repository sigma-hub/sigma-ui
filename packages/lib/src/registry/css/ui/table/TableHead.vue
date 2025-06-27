<script setup lang="ts">

</script>

<template>
  <th
    class="sigma-ui-table-head"
    :class="[$attrs.class]"
  >
    <slot />
  </th>
</template>

<style>
.sigma-ui-table-head {
  height: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  text-align: left;
  vertical-align: middle;
  font-weight: 500;
  color: hsl(var(--muted-foreground));
}

.sigma-ui-table-head:has([role=checkbox]) {
  padding-right: 0;
}
</style>
