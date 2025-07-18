<script lang="ts" setup>
</script>

<template>
  <div
    class="sigma-ui-drawer-footer"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-drawer-footer {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-top: auto;
  gap: 0.5rem;
}
</style>
