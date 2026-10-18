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
   * Badge content, such as a counter.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="sidebar-menu-badge"
    data-sidebar="menu-badge"
    class="sigma-ui-sidebar-menu-badge"
    v-bind="delegatedAttrs()"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-sidebar-menu-badge {
  position: absolute;
  top: calc(var(--spacing) * 1.5);
  right: calc(var(--spacing) * 1);
  display: flex;
  min-width: calc(var(--spacing) * 5);
  height: calc(var(--spacing) * 5);
  align-items: center;
  justify-content: center;
  padding: 0 calc(var(--spacing) * 1);
  border-radius: var(--radius-md);
  color: var(--foreground);
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  pointer-events: none;
  user-select: none;
}

.sigma-ui-sidebar-menu-button:hover ~ .sigma-ui-sidebar-menu-badge,
.sigma-ui-sidebar-menu-button[data-active="true"] ~ .sigma-ui-sidebar-menu-badge {
  color: var(--sidebar-accent-foreground);
}

.sigma-ui-sidebar-menu-button[data-size="sm"] ~ .sigma-ui-sidebar-menu-badge {
  top: calc(var(--spacing) * 1);
}

.sigma-ui-sidebar-menu-button[data-size="lg"] ~ .sigma-ui-sidebar-menu-badge {
  top: calc(var(--spacing) * 2.5);
}

.sigma-ui-sidebar[data-collapsible="icon"] .sigma-ui-sidebar-menu-badge {
  display: none;
}
</style>
