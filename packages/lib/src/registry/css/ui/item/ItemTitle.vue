<script setup lang="ts">
defineSlots<{
  /**
   * Primary text of the row.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="item-title"
    class="sigma-ui-item-title"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-item-title {
  display: flex;
  width: fit-content;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  gap: 0.5rem;
  line-height: 1.375;
}
</style>
