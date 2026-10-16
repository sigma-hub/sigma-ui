<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui';

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
    :class="{ 'sigma-ui-sidebar-menu-action--show-on-hover': showOnHover }"
  >
    <slot />
  </Primitive>
</template>

<style>
.sigma-ui-sidebar-menu-action {
  position: absolute;
  top: 0.375rem;
  right: 0.25rem;
  display: flex;
  width: 1.25rem;
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
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.sigma-ui-sidebar-menu-action::after {
  position: absolute;
  content: "";
  inset: -0.5rem;
}

.sigma-ui-sidebar-menu-button[data-size="sm"] ~ .sigma-ui-sidebar-menu-action {
  top: 0.25rem;
}

.sigma-ui-sidebar-menu-button[data-size="lg"] ~ .sigma-ui-sidebar-menu-action {
  top: 0.625rem;
}

.sigma-ui-sidebar[data-collapsible="icon"] .sigma-ui-sidebar-menu-action {
  display: none;
}

@media (width >= 768px) {
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
</style>
