<script lang="ts" setup>

</script>

<template>
  <span
    role="link"
    aria-disabled="true"
    aria-current="page"
    class="sigma-ui-breadcrumb__page"
    :class="$attrs.class"
    data-slot="breadcrumb-page"
  >
    <slot />
  </span>
</template>

<style>
.sigma-ui-breadcrumb__page {
  color: var(--foreground);
  font-weight: normal;
}
</style>
