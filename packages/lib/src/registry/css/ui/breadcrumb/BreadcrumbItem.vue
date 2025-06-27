<script lang="ts" setup>

</script>

<template>
  <li
    class="sigma-ui-breadcrumb__item"
    :class="$attrs.class"
  >
    <slot />
  </li>
</template>

<style>
.sigma-ui-breadcrumb__item {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}
</style>
