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
  as: 'button',
});

defineSlots<{
  /**
   * Action icon. Add a visually hidden label for screen readers.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <Primitive
    data-slot="sidebar-group-action"
    data-sidebar="group-action"
    :as="as"
    :as-child="asChild"
    class="sigma-ui-sidebar-group-action"
    v-bind="delegatedAttrs()"
    :class="[$attrs.class]"
  >
    <slot />
  </Primitive>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-sidebar-group-action {
    position: absolute;
    top: calc(var(--spacing) * 3.5);
    right: calc(var(--spacing) * 3);
    display: flex;
    width: calc(var(--spacing) * 5);
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    border-radius: var(--radius-md);
    aspect-ratio: 1 / 1;
    background-color: transparent;
    color: var(--foreground);
    outline: none;
    transition: transform 150ms;
  }

  .sigma-ui-sidebar-group-action:hover {
    background-color: var(--sidebar-accent);
    color: var(--sidebar-accent-foreground);
  }

  .sigma-ui-sidebar-group-action:focus-visible {
    box-shadow: 0 0 0 2px var(--sidebar-ring);
  }

  .sigma-ui-sidebar-group-action > svg {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    flex-shrink: 0;
  }

  .sigma-ui-sidebar-group-action::after {
    position: absolute;
    content: "";
    inset: calc(var(--spacing) * -2);
  }

  @media (width >= 48rem) {
    .sigma-ui-sidebar-group-action::after {
      display: none;
    }
  }

  .sigma-ui-sidebar[data-collapsible="icon"] .sigma-ui-sidebar-group-action {
    display: none;
  }
}
</style>
