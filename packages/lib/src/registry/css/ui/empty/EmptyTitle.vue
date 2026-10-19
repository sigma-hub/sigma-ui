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
   * Short title of the empty state.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="empty-title"
    v-bind="delegatedAttrs()"
    class="sigma-ui-empty-title"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
@layer components {
  .sigma-ui-empty-title {
    font-size: 1.125rem;
    font-weight: 500;
    letter-spacing: -0.025em;
  }
}
</style>
