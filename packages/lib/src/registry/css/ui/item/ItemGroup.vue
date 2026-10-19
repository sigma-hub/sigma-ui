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
   * `Item` rows, optionally divided by `ItemSeparator`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="item-group"
    v-bind="delegatedAttrs()"
    role="list"
    class="sigma-ui-item-group"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
@layer components {
  .sigma-ui-item-group {
    display: flex;
    flex-direction: column;
  }
}
</style>
