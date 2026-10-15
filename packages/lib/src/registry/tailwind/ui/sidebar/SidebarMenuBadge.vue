<script setup lang="ts">
import { cn } from '@ui/utils';

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
    :class="cn('pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-foreground select-none peer-hover/menu-button:text-secondary-foreground peer-data-[active=true]/menu-button:text-secondary-foreground peer-data-[size=sm]/menu-button:top-1 peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 group-data-[collapsible=icon]:hidden', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
