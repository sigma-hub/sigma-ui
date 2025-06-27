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
  gap: 0.375rem;
  padding: 1rem;
  text-align: center;
}

@media (min-width: 640px) {
  .sigma-ui-drawer-header {
    text-align: left;
  }
}
</style>
