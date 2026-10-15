<script setup lang="ts">
defineSlots<{
  /**
   * `Kbd` elements that form one shortcut.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <kbd
    data-slot="kbd-group"
    class="sigma-ui-kbd-group"
    :class="[$attrs.class]"
  >
    <slot />
  </kbd>
</template>

<style>
.sigma-ui-kbd-group {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}
</style>
