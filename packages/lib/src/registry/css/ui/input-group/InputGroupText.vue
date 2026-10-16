<script setup lang="ts">
defineSlots<{
  /**
   * Text or an icon shown inside an addon.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <span
    data-slot="input-group-text"
    class="sigma-ui-input-group-text"
    :class="[$attrs.class]"
  >
    <slot />
  </span>
</template>

<style>
.sigma-ui-input-group-text {
  display: flex;
  align-items: center;
  color: var(--muted-foreground);
  font-size: 0.875rem;
  gap: 0.5rem;
}

.sigma-ui-input-group-text svg {
  width: 1rem;
  height: 1rem;
  pointer-events: none;
}
</style>
