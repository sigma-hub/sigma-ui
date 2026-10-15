<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * Group parts: `SidebarGroupLabel`, `SidebarGroupAction`, and `SidebarGroupContent`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="sidebar-group"
    data-sidebar="group"
    :class="cn('relative flex w-full min-w-0 flex-col p-2', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
