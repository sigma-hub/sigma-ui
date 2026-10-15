<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * Scrollable sidebar body, usually one or more `SidebarGroup` components.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="sidebar-content"
    data-sidebar="content"
    :class="cn('flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
