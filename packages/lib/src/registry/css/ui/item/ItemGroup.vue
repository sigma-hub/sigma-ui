<script setup lang="ts">
defineSlots<{
  /**
   * `Item` rows, optionally divided by `ItemSeparator`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    role="list"
    data-slot="item-group"
    class="sigma-ui-item-group"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-item-group {
  display: flex;
  flex-direction: column;
}
</style>
