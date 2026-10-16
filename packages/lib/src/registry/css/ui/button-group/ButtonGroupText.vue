<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { Primitive, type PrimitiveProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

withDefaults(defineProps<PrimitiveProps>(), {
  as: 'div',
});

defineSlots<{
  /**
   * Static text or an icon, such as a URL prefix or a unit.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <Primitive
    data-slot="button-group-text"
    :as="as"
    :as-child="asChild"
    class="sigma-ui-button-group-text"
    v-bind="delegatedAttrs"
    :class="[$attrs.class]"
  >
    <slot />
  </Primitive>
</template>

<style>
.sigma-ui-button-group-text {
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--muted);
  font-size: 0.875rem;
  font-weight: 500;
  gap: 0.5rem;
}

.sigma-ui-button-group-text svg {
  pointer-events: none;
}

.sigma-ui-button-group-text svg:not([class*="size-"]) {
  width: 1rem;
  height: 1rem;
}
</style>
