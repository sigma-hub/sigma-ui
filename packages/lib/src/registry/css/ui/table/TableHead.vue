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
  padding-right: 1rem;
  padding-left: 1rem;
  color: hsl(var(--muted-foreground));
  font-weight: 500;
  text-align: left;
  vertical-align: middle;
}

.sigma-ui-table-head:has([role="checkbox"]) {
  padding-right: 0;
}
</style>
