<script setup lang="ts">
import { useAttrs } from 'vue';

import { Skeleton } from '@ui/registry/css/ui/skeleton';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

interface SidebarMenuSkeletonProps {
  /**
   * Renders an icon placeholder before the text placeholder.
   */
  showIcon?: boolean;
}

withDefaults(defineProps<SidebarMenuSkeletonProps>(), {
  showIcon: false,
});

const width = `${Math.floor(Math.random() * 40) + 50}%`;
</script>

<template>
  <div
    data-slot="sidebar-menu-skeleton"
    data-sidebar="menu-skeleton"
    class="sigma-ui-sidebar-menu-skeleton"
    v-bind="delegatedAttrs()"
    :class="[$attrs.class]"
  >
    <Skeleton
      v-if="showIcon"
      class="sigma-ui-sidebar-menu-skeleton__icon"
      data-sidebar="menu-skeleton-icon"
    />
    <Skeleton
      class="sigma-ui-sidebar-menu-skeleton__text"
      data-sidebar="menu-skeleton-text"
      :style="{ '--skeleton-width': width }"
    />
  </div>
</template>

<style>
.sigma-ui-sidebar-menu-skeleton {
  display: flex;
  height: calc(var(--spacing) * 8);
  align-items: center;
  padding: 0 calc(var(--spacing) * 2);
  border-radius: var(--radius-md);
  gap: calc(var(--spacing) * 2);
}

.sigma-ui-sidebar-menu-skeleton__icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}

.sigma-ui-sidebar-menu-skeleton__text {
  max-width: var(--skeleton-width);
  height: calc(var(--spacing) * 4);
  flex: 1;
}
</style>
