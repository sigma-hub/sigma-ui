<script lang="ts" setup>

</script>

<template>
  <span
    role="link"
    aria-disabled="true"
    aria-current="page"
    class="sigma-ui-breadcrumb__page"
    :class="$attrs.class"
  >
    <slot />
  </span>
</template>

<style>
.sigma-ui-breadcrumb__page {
  color: hsl(var(--foreground));
  font-weight: normal;
}
</style>
