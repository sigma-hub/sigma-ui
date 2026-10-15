<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * List of `SidebarMenuItem` components.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <ul
    data-slot="sidebar-menu"
    data-sidebar="menu"
    :class="cn('flex w-full min-w-0 flex-col gap-1', $attrs.class ?? '')"
  >
    <slot />
  </ul>
</template>
