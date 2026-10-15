<script setup lang="ts">
import { cn } from '@ui/utils';
import { useSidebar } from './utils';

const { toggleSidebar } = useSidebar();
</script>

<template>
  <button
    type="button"
    data-sidebar="rail"
    data-slot="sidebar-rail"
    aria-label="Toggle Sidebar"
    title="Toggle Sidebar"
    :tabindex="-1"
    :class="cn(
      'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 hover:after:bg-border sm:flex',
      'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
      '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
      'group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-background',
      '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
      '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
      $attrs.class ?? '',
    )"
    @click="toggleSidebar"
  >
    <slot />
  </button>
</template>
