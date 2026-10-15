<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * A `SidebarMenuSubButton`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <li
    data-slot="sidebar-menu-sub-item"
    data-sidebar="menu-sub-item"
    :class="cn('group/menu-sub-item relative', $attrs.class ?? '')"
  >
    <slot />
  </li>
</template>
