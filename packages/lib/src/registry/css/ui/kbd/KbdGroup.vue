<script setup lang="ts">
import { computed, useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

defineSlots<{
  /**
   * `Kbd` elements that form one shortcut.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <kbd
    v-bind="delegatedAttrs"
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
