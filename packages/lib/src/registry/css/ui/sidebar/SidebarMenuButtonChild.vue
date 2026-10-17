<script setup lang="ts">
import { useAttrs } from 'vue';

import { Primitive, type PrimitiveProps } from 'reka-ui';
import { type SidebarMenuButtonVariants, sidebarMenuButtonVariants } from '.';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

export interface SidebarMenuButtonProps extends PrimitiveProps {
  /**
   * Visual style of the button.
   */
  variant?: SidebarMenuButtonVariants['variant'];
  /**
   * Height and text size of the button.
   */
  size?: SidebarMenuButtonVariants['size'];
  /**
   * Marks the button as the current page or section.
   */
  isActive?: boolean;
}

const props = withDefaults(defineProps<SidebarMenuButtonProps>(), {
  as: 'button',
  variant: 'default',
  size: 'default',
  isActive: false,
});
</script>

<template>
  <Primitive
    v-bind="delegatedAttrs()"
    data-slot="sidebar-menu-button"
    data-sidebar="menu-button"
    :data-size="size"
    :data-active="props.isActive"
    :as="as"
    :as-child="asChild"
    :class="[sidebarMenuButtonVariants({ variant, size }), $attrs.class]"
  >
    <slot />
  </Primitive>
</template>

<style>
.sigma-ui-sidebar-menu-button {
  display: flex;
  overflow: hidden;
  width: 100%;
  align-items: center;
  padding: 0.5rem;
  border: none;
  border-radius: var(--radius-md);
  background-color: transparent;
  color: inherit;
  font-size: 0.875rem;
  gap: 0.5rem;
  outline: none;
  text-align: left;
  text-decoration: none;
  transition: width 200ms linear, height 200ms linear, padding 200ms linear;
}

.sigma-ui-sidebar-menu-button:hover,
.sigma-ui-sidebar-menu-button:active,
.sigma-ui-sidebar-menu-button[data-active="true"],
.sigma-ui-sidebar-menu-button[data-state="open"]:hover {
  background-color: var(--sidebar-accent);
  color: var(--sidebar-accent-foreground);
}

.sigma-ui-sidebar-menu-button[data-active="true"] {
  font-weight: 500;
}

.sigma-ui-sidebar-menu-button:focus-visible {
  box-shadow: 0 0 0 2px var(--sidebar-ring);
}

.sigma-ui-sidebar-menu-button:disabled,
.sigma-ui-sidebar-menu-button[aria-disabled="true"] {
  opacity: 0.5;
  pointer-events: none;
}

.sigma-ui-sidebar-menu-button > svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.sigma-ui-sidebar-menu-button > span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sigma-ui-sidebar-menu-item:has(.sigma-ui-sidebar-menu-action) .sigma-ui-sidebar-menu-button {
  padding-right: 2rem;
}

.sigma-ui-sidebar-menu-button--outline {
  background-color: var(--background);
  box-shadow: 0 0 0 1px var(--border);
}

.sigma-ui-sidebar-menu-button--size-default {
  height: 2rem;
  font-size: 0.875rem;
}

.sigma-ui-sidebar-menu-button--size-sm {
  height: 1.75rem;
  font-size: 0.75rem;
}

.sigma-ui-sidebar-menu-button--size-lg {
  height: 3rem;
  font-size: 0.875rem;
}

.sigma-ui-sidebar[data-collapsible="icon"] .sigma-ui-sidebar-menu-button {
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
}

.sigma-ui-sidebar[data-collapsible="icon"] .sigma-ui-sidebar-menu-button--size-lg {
  padding: 0;
}
</style>
