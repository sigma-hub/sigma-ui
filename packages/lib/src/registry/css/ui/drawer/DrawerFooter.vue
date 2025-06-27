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
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
}
</style>
