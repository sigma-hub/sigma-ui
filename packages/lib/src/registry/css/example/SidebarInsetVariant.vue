<script setup lang="ts">
import { FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@lucide/vue';
import { Separator } from '@ui/registry/css/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@ui/registry/css/ui/sidebar';

const items = [
  { title: 'Home', icon: HomeIcon, isActive: true },
  { title: 'Inbox', icon: InboxIcon },
  { title: 'Projects', icon: FolderIcon },
  { title: 'Team', icon: UsersIcon },
];
</script>

<template>
  <div class="example-sidebar-inset">
    <SidebarProvider
      cookie-name=""
      class="example-sidebar-inset__provider"
    >
      <Sidebar
        variant="inset"
        class="example-sidebar-inset__sidebar"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  v-for="item in items"
                  :key="item.title"
                >
                  <SidebarMenuButton :is-active="item.isActive">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header class="example-sidebar-inset__header">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            class="example-sidebar-inset__separator"
          />
          <span class="example-sidebar-inset__title">Home</span>
        </header>
        <div class="example-sidebar-inset__body">
          <div class="example-sidebar-inset__panel" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .example-sidebar-inset {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 420px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    transform: translateZ(0);
  }

  .example-sidebar-inset .example-sidebar-inset__provider {
    height: 100%;
    min-height: 100%;
  }

  .example-sidebar-inset .example-sidebar-inset__sidebar {
    height: 100%;
  }

  .example-sidebar-inset__header {
    display: flex;
    height: calc(var(--spacing) * 12);
    flex-shrink: 0;
    align-items: center;
    padding: 0 calc(var(--spacing) * 4);
    border-bottom: 1px solid var(--border);
    gap: calc(var(--spacing) * 2);
  }

  .example-sidebar-inset .example-sidebar-inset__separator {
    height: calc(var(--spacing) * 4);
    margin-right: calc(var(--spacing) * 2);
  }

  .example-sidebar-inset__title {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .example-sidebar-inset__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: calc(var(--spacing) * 4);
  }

  .example-sidebar-inset__panel {
    flex: 1;
    border-radius: calc(var(--radius) + 4px);
    background-color: color-mix(in oklch, var(--muted) 50%, transparent);
  }
}
</style>
