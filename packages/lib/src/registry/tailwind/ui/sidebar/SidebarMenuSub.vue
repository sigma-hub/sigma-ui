<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * List of `SidebarMenuSubItem` components.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <ul
    data-slot="sidebar-menu-sub"
    data-sidebar="menu-sub"
    :class="cn('mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden', $attrs.class ?? '')"
  >
    <slot />
  </ul>
</template>
