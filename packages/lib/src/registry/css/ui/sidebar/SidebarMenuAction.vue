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

interface SidebarMenuActionProps extends PrimitiveProps {
  /**
   * Shows the action only while the menu item is hovered or focused.
   */
  showOnHover?: boolean;
}

withDefaults(defineProps<SidebarMenuActionProps>(), {
  as: 'button',
  showOnHover: false,
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
    data-slot="sidebar-menu-action"
    data-sidebar="menu-action"
    :as="as"
    :as-child="asChild"
    class="sigma-ui-sidebar-menu-action"
    :class="[{ 'sigma-ui-sidebar-menu-action--show-on-hover': showOnHover }, $attrs.class]"
    v-bind="delegatedAttrs()"
  >
    <slot />
  </Primitive>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-sidebar-menu-action {
    position: absolute;
    top: calc(var(--spacing) * 1.5);
    right: calc(var(--spacing) * 1);
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

  .sigma-ui-sidebar-menu-action:hover,
  .sigma-ui-sidebar-menu-button:hover ~ .sigma-ui-sidebar-menu-action {
    color: var(--sidebar-accent-foreground);
  }

  .sigma-ui-sidebar-menu-action:hover {
    background-color: var(--sidebar-accent);
  }

  .sigma-ui-sidebar-menu-action:focus-visible {
    box-shadow: 0 0 0 2px var(--sidebar-ring);
  }

  .sigma-ui-sidebar-menu-action > svg {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    flex-shrink: 0;
  }

  .sigma-ui-sidebar-menu-action::after {
    position: absolute;
    content: "";
    inset: calc(var(--spacing) * -2);
  }

  .sigma-ui-sidebar-menu-button[data-size="sm"] ~ .sigma-ui-sidebar-menu-action {
    top: calc(var(--spacing) * 1);
  }

  .sigma-ui-sidebar-menu-button[data-size="lg"] ~ .sigma-ui-sidebar-menu-action {
    top: calc(var(--spacing) * 2.5);
  }

  .sigma-ui-sidebar[data-collapsible="icon"] .sigma-ui-sidebar-menu-action {
    display: none;
  }

  @media (width >= 48rem) {
    .sigma-ui-sidebar-menu-action::after {
      display: none;
    }

    .sigma-ui-sidebar-menu-action--show-on-hover {
      opacity: 0;
    }

    .sigma-ui-sidebar-menu-item:hover .sigma-ui-sidebar-menu-action--show-on-hover,
    .sigma-ui-sidebar-menu-item:focus-within .sigma-ui-sidebar-menu-action--show-on-hover,
    .sigma-ui-sidebar-menu-action--show-on-hover[data-state="open"] {
      opacity: 1;
    }
  }
}
</style>
