<script setup lang="ts">
defineSlots<{
  /**
   * Content that spans the full width above the row body.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="item-header"
    class="sigma-ui-item-header"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-item-header {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
</style>
