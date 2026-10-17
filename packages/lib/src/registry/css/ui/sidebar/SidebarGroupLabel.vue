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
   * Label text, optionally with an icon.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <Primitive
    data-slot="sidebar-group-label"
    data-sidebar="group-label"
    :as="as"
    :as-child="asChild"
    class="sigma-ui-sidebar-group-label"
    v-bind="delegatedAttrs()"
    :class="[$attrs.class]"
  >
    <slot />
  </Primitive>
</template>

<style>
.sigma-ui-sidebar-group-label {
  display: flex;
  height: 2rem;
  flex-shrink: 0;
  align-items: center;
  padding: 0 0.5rem;
  border-radius: var(--radius-md);
  color: var(--muted-foreground);
  font-size: 0.75rem;
  font-weight: 500;
  outline: none;
  transition: margin 200ms linear, opacity 200ms linear;
}

.sigma-ui-sidebar-group-label:focus-visible {
  box-shadow: 0 0 0 2px var(--sidebar-ring);
}

.sigma-ui-sidebar-group-label > svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.sigma-ui-sidebar[data-collapsible="icon"] .sigma-ui-sidebar-group-label {
  margin-top: -2rem;
  opacity: 0;
  pointer-events: none;
  user-select: none;
}
</style>
