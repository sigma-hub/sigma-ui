<script lang="ts" setup>
</script>

<template>
  <div
    class="sigma-ui-drawer-header"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-drawer-header {
  display: grid;
  padding: 1rem;
  gap: 0.375rem;
  text-align: center;
}

@media (width >= 640px) {
  .sigma-ui-drawer-header {
    text-align: left;
  }
}
</style>
