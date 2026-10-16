<script setup lang="ts">
defineSlots<{
  /**
   * Content that spans the full width under the row body.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="item-footer"
    class="sigma-ui-item-footer"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-item-footer {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
</style>
