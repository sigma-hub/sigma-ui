<script setup lang="ts">
import { useAttrs } from 'vue';

import { Primitive, type PrimitiveProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    v-bind="delegatedAttrs()"
    :class="[$attrs.class]"
  >
    <slot />
  </Primitive>
</template>

<style>
@layer components {
  .sigma-ui-button-group-text {
    display: flex;
    align-items: center;
    padding: 0 calc(var(--spacing) * 4);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background-color: var(--muted);
    font-size: 0.875rem;
    font-weight: 500;
    gap: calc(var(--spacing) * 2);
  }

  .sigma-ui-button-group-text svg {
    pointer-events: none;
  }

  .sigma-ui-button-group-text svg:not([class*="size-"]) {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }
}
</style>
