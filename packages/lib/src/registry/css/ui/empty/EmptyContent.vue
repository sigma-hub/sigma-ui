<script setup lang="ts">
defineSlots<{
  /**
   * Actions, such as a button, under the description.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="empty-content"
    class="sigma-ui-empty-content"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-empty-content {
  display: flex;
  width: 100%;
  max-width: 24rem;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  font-size: 0.875rem;
  text-wrap: balance;
  gap: 1rem;
}
</style>
