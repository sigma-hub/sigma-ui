<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { Primitive, type PrimitiveProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

interface SidebarMenuSubButtonProps extends PrimitiveProps {
  /**
   * Text size of the button.
   */
  size?: 'sm' | 'md';
  /**
   * Marks the button as the current page.
   */
  isActive?: boolean;
}

const props = withDefaults(defineProps<SidebarMenuSubButtonProps>(), {
  as: 'a',
  size: 'md',
  isActive: false,
});

defineSlots<{
  /**
   * Button content, usually a `<span>` label.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <Primitive
    data-slot="sidebar-menu-sub-button"
    data-sidebar="menu-sub-button"
    :as="as"
    :as-child="asChild"
    :data-size="size"
    :data-active="props.isActive"
    class="sigma-ui-sidebar-menu-sub-button"
    v-bind="delegatedAttrs"
    :class="[$attrs.class]"
  >
    <slot />
  </Primitive>
</template>

<style>
.sigma-ui-sidebar-menu-sub-button {
  display: flex;
  overflow: hidden;
  min-width: 0;
  height: 1.75rem;
  align-items: center;
  padding: 0 0.5rem;
  border-radius: var(--radius-md);
  color: var(--foreground);
  font-size: 0.875rem;
  gap: 0.5rem;
  outline: none;
  text-decoration: none;
  transform: translateX(-1px);
}

.sigma-ui-sidebar-menu-sub-button[data-size="sm"] {
  font-size: 0.75rem;
}

.sigma-ui-sidebar-menu-sub-button:hover,
.sigma-ui-sidebar-menu-sub-button:active,
.sigma-ui-sidebar-menu-sub-button[data-active="true"] {
  background-color: var(--sidebar-accent);
  color: var(--sidebar-accent-foreground);
}

.sigma-ui-sidebar-menu-sub-button:focus-visible {
  box-shadow: 0 0 0 2px var(--sidebar-ring);
}

.sigma-ui-sidebar-menu-sub-button:disabled,
.sigma-ui-sidebar-menu-sub-button[aria-disabled="true"] {
  opacity: 0.5;
  pointer-events: none;
}

.sigma-ui-sidebar-menu-sub-button > svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  color: var(--sidebar-accent-foreground);
}

.sigma-ui-sidebar-menu-sub-button > span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sigma-ui-sidebar[data-collapsible="icon"] .sigma-ui-sidebar-menu-sub-button {
  display: none;
}
</style>
