<script setup lang="ts">
defineSlots<{
  /**
   * Buttons or other controls at the end of the row.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="item-actions"
    class="sigma-ui-item-actions"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-item-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
