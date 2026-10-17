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
    v-bind="delegatedAttrs()"
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
  gap: 1.5rem;
  text-align: center;
  text-wrap: balance;
}

@media (width >= 48rem) {
  .sigma-ui-empty {
    padding: 3rem;
  }
}
</style>
