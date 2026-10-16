<script setup lang="ts">
defineSlots<{
  /**
   * `EmptyHeader`, `EmptyMedia`, and `EmptyContent`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="empty"
    class="sigma-ui-empty"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-empty {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border: 1px dashed var(--border);
  border-radius: var(--radius-lg);
  text-align: center;
  text-wrap: balance;
  gap: 1.5rem;
}

@media (width >= 48rem) {
  .sigma-ui-empty {
    padding: 3rem;
  }
}
</style>
