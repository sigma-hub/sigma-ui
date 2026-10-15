<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * Group body, usually a `SidebarMenu`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="sidebar-group-content"
    data-sidebar="group-content"
    :class="cn('w-full text-sm', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
