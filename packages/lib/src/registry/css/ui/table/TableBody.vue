<script setup lang="ts">

</script>

<template>
  <tbody
    class="sigma-ui-table-body"
    :class="[$attrs.class]"
  >
    <slot />
  </tbody>
</template>

<style>
.sigma-ui-table-body tr:last-child {
  border: 0;
}
</style>
