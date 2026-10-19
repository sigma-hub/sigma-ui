<script setup lang="ts">
import { useAttrs } from 'vue';

import { Skeleton } from '@ui/registry/tailwind/ui/skeleton';
import { cn } from '@ui/utils';
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
    v-bind="delegatedAttrs()"
    data-sidebar="menu-skeleton"
    :class="cn('flex h-8 items-center gap-2 rounded-md px-2', $attrs.class ?? '')"
  >
    <Skeleton
      v-if="showIcon"
      class="size-4 rounded-md"
      data-sidebar="menu-skeleton-icon"
    />
    <Skeleton
      class="h-4 max-w-(--skeleton-width) flex-1"
      data-sidebar="menu-skeleton-text"
      :style="{ '--skeleton-width': width }"
    />
  </div>
</template>
