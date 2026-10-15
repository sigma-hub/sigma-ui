---
title: Sidebar
description: A composable, themeable, and collapsible sidebar for application layouts.
source: sidebar
label: New
---

## Preview

<ComponentPreview name="Sidebar" size="unset" class="max-w-full" />

Press `Ctrl + B` (`Cmd + B` on macOS) to toggle the sidebar, or click the rail on its edge.

## Installation

```bash
npx sigma-ui add sidebar
```

## Structure

A sidebar is made of these parts:

- `SidebarProvider` - holds the open state, persists it in a cookie, and handles the keyboard shortcut.
- `Sidebar` - the sidebar container. Renders a sheet on mobile.
- `SidebarHeader` and `SidebarFooter` - sticky top and bottom sections.
- `SidebarContent` - the scrollable body.
- `SidebarGroup` - a section inside `SidebarContent`, with `SidebarGroupLabel`, `SidebarGroupAction`, and `SidebarGroupContent`.
- `SidebarMenu` - a list of `SidebarMenuItem` components, each with a `SidebarMenuButton` and optional `SidebarMenuAction`, `SidebarMenuBadge`, and `SidebarMenuSub`.
- `SidebarTrigger` and `SidebarRail` - controls that toggle the sidebar.
- `SidebarInset` - the main content area next to the sidebar.

```vue
<script setup lang="ts">
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
</script>

<template>
  <SidebarProvider>
    <Sidebar>
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </Sidebar>
    <SidebarInset>
      <SidebarTrigger />
      <RouterView />
    </SidebarInset>
  </SidebarProvider>
</template>
```

## Keyboard Support

<KeybindingsTable :data="[
  {
    'name': 'ctrl+b',
    'description': 'Toggles the sidebar. Uses cmd+b on macOS.',
    'type': 'keydown',
  },
]" />

## Examples

### Floating

<ComponentPreview name="SidebarFloating" size="unset" class="max-w-full" />

Use `variant="floating"` to detach the sidebar from the edge of the screen with a border and shadow.

### Inset

<ComponentPreview name="SidebarInsetVariant" size="unset" class="max-w-full" />

Use `variant="inset"` together with `SidebarInset` to place the main content in a raised card.

### Menu actions and badges

<ComponentPreview name="SidebarMenuExtras" size="unset" class="max-w-full" />

`SidebarMenuAction` adds a secondary action to a menu item, `SidebarMenuBadge` shows a counter, and `SidebarMenuSkeleton` is a loading placeholder.

### Controlled

<ComponentPreview name="SidebarControlled" size="unset" class="max-w-full" />

Use `v-model:open` on `SidebarProvider` to control the sidebar from your own state.

## Notes

- `useSidebar()` returns `state`, `open`, `setOpen`, `isMobile`, `openMobile`, `setOpenMobile`, and `toggleSidebar`. Call it inside any component rendered within `SidebarProvider`.

- The desktop open state is saved in the `sidebar_state` cookie. Change the name with the `cookie-name` prop, or pass an empty string to disable it. In Nuxt, read the cookie with `useCookie('sidebar_state')` and pass it to `default-open` to avoid a layout shift on page load.

- Below 768px the sidebar renders as a sheet. `collapsible="icon"` shrinks it to icons only on desktop; pass `tooltip` to `SidebarMenuButton` to show labels on hover while collapsed.

- Override the width with the `--sidebar-width` and `--sidebar-width-icon` CSS variables on `SidebarProvider`.
