<script setup lang="ts">
defineSlots<{
  /**
   * Short title of the empty state.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="empty-title"
    class="sigma-ui-empty-title"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-empty-title {
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: -0.025em;
}
</style>
