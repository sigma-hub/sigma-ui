<script setup lang="ts">

</script>

<template>
  <tbody
    class="sigma-ui-table-body"
    :class="[$attrs.class]"
    data-slot="table-body"
  >
    <slot />
  </tbody>
</template>

<style>
.sigma-ui-table-body tr:last-child {
  border: 0;
}
</style>
