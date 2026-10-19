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
   * `Kbd` elements that form one shortcut.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <kbd
    data-slot="kbd-group"
    v-bind="delegatedAttrs()"
    class="sigma-ui-kbd-group"
    :class="[$attrs.class]"
  >
    <slot />
  </kbd>
</template>

<style>
@layer components {
  .sigma-ui-kbd-group {
    display: inline-flex;
    align-items: center;
    gap: calc(var(--spacing) * 1);
  }
}
</style>
