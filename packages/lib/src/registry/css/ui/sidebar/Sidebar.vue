<script setup lang="ts">
import { VisuallyHidden } from 'reka-ui';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@ui/registry/css/ui/sheet';
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
    data-slot="sidebar"
    v-bind="$attrs"
    class="sigma-ui-sidebar--static"
  >
    <slot />
  </div>

  <Sheet
    v-else-if="isMobile"
    :open="openMobile"
    @update:open="setOpenMobile"
  >
    <SheetContent
      data-slot="sidebar"
      v-bind="$attrs"
      data-sidebar="sidebar"
      data-mobile="true"
      :side="side"
      class="sigma-ui-sidebar--mobile"
      :style="{ '--sidebar-width': SIDEBAR_WIDTH_MOBILE }"
    >
      <VisuallyHidden as="div">
        <SheetHeader>
          <SheetTitle>Sidebar</SheetTitle>
          <SheetDescription>Displays the mobile sidebar.</SheetDescription>
        </SheetHeader>
      </VisuallyHidden>
      <div class="sigma-ui-sidebar__mobile-inner">
        <slot />
      </div>
    </SheetContent>
  </Sheet>

  <div
    v-else
    class="sigma-ui-sidebar"
    data-slot="sidebar"
    :data-state="state"
    :data-collapsible="state === 'collapsed' ? collapsible : ''"
    :data-variant="variant"
    :data-side="side"
  >
    <div
      data-slot="sidebar-gap"
      class="sigma-ui-sidebar__gap"
    />
    <div
      data-slot="sidebar-container"
      v-bind="$attrs"
      class="sigma-ui-sidebar__container"
    >
      <div
        data-sidebar="sidebar"
        data-slot="sidebar-inner"
        class="sigma-ui-sidebar__inner"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
@layer components {
  .sigma-ui-sidebar--static {
    display: flex;
    width: var(--sidebar-width);
    height: 100%;
    flex-direction: column;
    background-color: var(--sidebar);
    color: var(--sidebar-foreground);
  }

  .sigma-ui-sheet-content__base.sigma-ui-sidebar--mobile {
    width: var(--sidebar-width);
    max-width: none;
    padding: 0;
    background-color: var(--sidebar);
    color: var(--sidebar-foreground);
  }

  .sigma-ui-sidebar--mobile > .sigma-ui-sheet-close {
    display: none;
  }

  .sigma-ui-sidebar__mobile-inner {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
  }

  .sigma-ui-sidebar {
    display: none;
    color: var(--sidebar-foreground);
  }

  .sigma-ui-sidebar__gap {
    position: relative;
    width: var(--sidebar-width);
    background-color: transparent;
    transition: width 200ms linear;
  }

  .sigma-ui-sidebar__container {
    position: fixed;
    z-index: 10;
    display: none;
    width: var(--sidebar-width);
    height: 100svh;
    inset-block: 0;
    transition: left 200ms linear, right 200ms linear, width 200ms linear;
  }

  .sigma-ui-sidebar__inner {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    background-color: var(--sidebar);
  }

  .sigma-ui-sidebar[data-side="left"] .sigma-ui-sidebar__container {
    left: 0;
  }

  .sigma-ui-sidebar[data-side="right"] .sigma-ui-sidebar__container {
    right: 0;
  }

  .sigma-ui-sidebar[data-side="right"] .sigma-ui-sidebar__gap {
    transform: rotate(180deg);
  }

  .sigma-ui-sidebar[data-collapsible="offcanvas"] .sigma-ui-sidebar__gap {
    width: 0;
  }

  .sigma-ui-sidebar[data-side="left"][data-collapsible="offcanvas"] .sigma-ui-sidebar__container {
    left: calc(var(--sidebar-width) * -1);
  }

  .sigma-ui-sidebar[data-side="right"][data-collapsible="offcanvas"] .sigma-ui-sidebar__container {
    right: calc(var(--sidebar-width) * -1);
  }

  .sigma-ui-sidebar[data-variant="sidebar"][data-side="left"] .sigma-ui-sidebar__container {
    border-right: 1px solid var(--sidebar-border);
  }

  .sigma-ui-sidebar[data-variant="sidebar"][data-side="right"] .sigma-ui-sidebar__container {
    border-left: 1px solid var(--sidebar-border);
  }

  .sigma-ui-sidebar[data-variant="sidebar"][data-collapsible="icon"] .sigma-ui-sidebar__gap,
  .sigma-ui-sidebar[data-variant="sidebar"][data-collapsible="icon"] .sigma-ui-sidebar__container {
    width: var(--sidebar-width-icon);
  }

  .sigma-ui-sidebar[data-variant="floating"] .sigma-ui-sidebar__container,
  .sigma-ui-sidebar[data-variant="inset"] .sigma-ui-sidebar__container {
    padding: calc(var(--spacing) * 2);
  }

  .sigma-ui-sidebar[data-variant="floating"][data-collapsible="icon"] .sigma-ui-sidebar__gap,
  .sigma-ui-sidebar[data-variant="inset"][data-collapsible="icon"] .sigma-ui-sidebar__gap {
    width: calc(var(--sidebar-width-icon) + 1rem);
  }

  .sigma-ui-sidebar[data-variant="floating"][data-collapsible="icon"] .sigma-ui-sidebar__container,
  .sigma-ui-sidebar[data-variant="inset"][data-collapsible="icon"] .sigma-ui-sidebar__container {
    width: calc(var(--sidebar-width-icon) + 1rem + 2px);
  }

  .sigma-ui-sidebar[data-variant="floating"] .sigma-ui-sidebar__inner {
    border: 1px solid var(--sidebar-border);
    border-radius: var(--radius);
    box-shadow: 0 1px 3px rgb(0 0 0 / 10%), 0 1px 2px -1px rgb(0 0 0 / 10%);
  }

  .sigma-ui-sidebar[data-variant="inset"] .sigma-ui-sidebar__inner {
    background-color: transparent;
  }

  @media (width >= 48rem) {
    .sigma-ui-sidebar {
      display: block;
    }

    .sigma-ui-sidebar__container {
      display: flex;
    }
  }
}
</style>
