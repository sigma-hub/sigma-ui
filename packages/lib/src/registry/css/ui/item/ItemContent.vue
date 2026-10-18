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
   * Title and description.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="item-content"
    v-bind="delegatedAttrs()"
    class="sigma-ui-item-content"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-item-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: calc(var(--spacing) * 1);
}

.sigma-ui-item-content + .sigma-ui-item-content {
  flex: none;
}
</style>
