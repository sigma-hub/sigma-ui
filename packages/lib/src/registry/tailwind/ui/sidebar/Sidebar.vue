<script setup lang="ts">
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@ui/registry/tailwind/ui/sheet';
import { cn } from '@ui/utils';
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from './utils';

interface SidebarProps {
  /**
   * Side of the screen the sidebar is attached to.
   */
  side?: 'left' | 'right';
  /**
   * Visual style. `floating` adds a border and shadow, `inset` places the main content in a card next to the sidebar (use with `SidebarInset`).
   */
  variant?: 'sidebar' | 'floating' | 'inset';
  /**
   * Collapse behavior on desktop. `offcanvas` slides the sidebar out, `icon` shrinks it to icons only, `none` keeps it always expanded.
   */
  collapsible?: 'offcanvas' | 'icon' | 'none';
}

defineOptions({
  inheritAttrs: false,
});

withDefaults(defineProps<SidebarProps>(), {
  side: 'left',
  variant: 'sidebar',
  collapsible: 'offcanvas',
});

defineSlots<{
  /**
   * Sidebar sections such as `SidebarHeader`, `SidebarContent`, `SidebarFooter`, and `SidebarRail`.
   */
  default?: () => unknown;
}>();

const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
</script>

<template>
  <div
    v-if="collapsible === 'none'"
    v-bind="$attrs"
    data-slot="sidebar"
    :class="cn('flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground', $attrs.class ?? '')"
  >
    <slot />
  </div>

  <Sheet
    v-else-if="isMobile"
    :open="openMobile"
    @update:open="setOpenMobile"
  >
    <SheetContent
      v-bind="$attrs"
      data-sidebar="sidebar"
      data-slot="sidebar"
      data-mobile="true"
      :side="side"
      :class="cn('w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden', $attrs.class ?? '')"
      :style="{ '--sidebar-width': SIDEBAR_WIDTH_MOBILE }"
    >
      <SheetHeader class="sr-only">
        <SheetTitle>Sidebar</SheetTitle>
        <SheetDescription>Displays the mobile sidebar.</SheetDescription>
      </SheetHeader>
      <div class="flex h-full w-full flex-col">
        <slot />
      </div>
    </SheetContent>
  </Sheet>

  <div
    v-else
    class="group peer hidden text-sidebar-foreground md:block"
    data-slot="sidebar"
    :data-state="state"
    :data-collapsible="state === 'collapsed' ? collapsible : ''"
    :data-variant="variant"
    :data-side="side"
  >
    <div
      data-slot="sidebar-gap"
      :class="cn(
        'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
        'group-data-[collapsible=offcanvas]:w-0',
        'group-data-[side=right]:rotate-180',
        variant === 'floating' || variant === 'inset'
          ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
          : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
      )"
    />
    <div
      v-bind="$attrs"
      data-slot="sidebar-container"
      :class="cn(
        'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex',
        side === 'left'
          ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
          : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
        variant === 'floating' || variant === 'inset'
          ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
          : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
        $attrs.class ?? '',
      )"
    >
      <div
        data-sidebar="sidebar"
        data-slot="sidebar-inner"
        class="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm group-data-[variant=inset]:bg-transparent"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
