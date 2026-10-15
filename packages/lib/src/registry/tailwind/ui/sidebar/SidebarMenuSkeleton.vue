<script setup lang="ts">
import { Skeleton } from '@ui/registry/tailwind/ui/skeleton';
import { cn } from '@ui/utils';

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
