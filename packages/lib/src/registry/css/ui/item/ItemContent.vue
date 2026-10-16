<script setup lang="ts">
defineSlots<{
  /**
   * Title and description.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="item-content"
    class="sigma-ui-item-content"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-item-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.25rem;
}

.sigma-ui-item-content + .sigma-ui-item-content {
  flex: none;
}
</style>
