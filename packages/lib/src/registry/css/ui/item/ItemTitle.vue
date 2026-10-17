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
   * Primary text of the row.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs()"
    data-slot="item-title"
    class="sigma-ui-item-title"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-item-title {
  display: flex;
  width: fit-content;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  gap: 0.5rem;
  line-height: 1.375;
}
</style>
