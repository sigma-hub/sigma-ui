<script setup lang="ts">
import { computed, useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

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
    v-bind="delegatedAttrs"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-sidebar-menu-badge {
  position: absolute;
  top: 0.375rem;
  right: 0.25rem;
  display: flex;
  min-width: 1.25rem;
  height: 1.25rem;
  align-items: center;
  justify-content: center;
  padding: 0 0.25rem;
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
  top: 0.25rem;
}

.sigma-ui-sidebar-menu-button[data-size="lg"] ~ .sigma-ui-sidebar-menu-badge {
  top: 0.625rem;
}

.sigma-ui-sidebar[data-collapsible="icon"] .sigma-ui-sidebar-menu-badge {
  display: none;
}
</style>
