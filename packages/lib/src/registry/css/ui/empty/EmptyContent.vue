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
   * Actions, such as a button, under the description.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="empty-content"
    v-bind="delegatedAttrs()"
    class="sigma-ui-empty-content"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-empty-content {
    display: flex;
    width: 100%;
    min-width: 0;
    max-width: 24rem;
    flex-direction: column;
    align-items: center;
    font-size: 0.875rem;
    gap: calc(var(--spacing) * 4);
    text-wrap: balance;
  }
}
</style>
