<script setup lang="ts">
import { useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    v-bind="delegatedAttrs()"
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
  padding: calc(var(--spacing) * 6);
  border: 1px dashed var(--border);
  border-radius: var(--radius-lg);
  gap: calc(var(--spacing) * 6);
  text-align: center;
  text-wrap: balance;
}

@media (width >= 48rem) {
  .sigma-ui-empty {
    padding: calc(var(--spacing) * 12);
  }
}
</style>
