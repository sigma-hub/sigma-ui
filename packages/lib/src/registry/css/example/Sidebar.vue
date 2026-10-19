<script setup lang="ts">
import type { Component } from 'vue';
import {
  BookOpenIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  GalleryVerticalEndIcon,
  LayoutDashboardIcon,
  MoreHorizontalIcon,
  Settings2Icon,
  SquareTerminalIcon,
} from '@lucide/vue';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@ui/registry/css/ui/collapsible';
import { Separator } from '@ui/registry/css/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@ui/registry/css/ui/sidebar';

interface NavigationItem {
  title: string;
  icon: Component;
  isActive?: boolean;
  items: { title: string; isActive?: boolean }[];
}

const navigation: NavigationItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboardIcon,
    isActive: true,
    items: [
      { title: 'Overview', isActive: true },
      { title: 'Analytics' },
      { title: 'Reports' },
    ],
  },
  {
    title: 'Playground',
    icon: SquareTerminalIcon,
    items: [
      { title: 'History' },
      { title: 'Starred' },
    ],
  },
  {
    title: 'Documentation',
    icon: BookOpenIcon,
    items: [
      { title: 'Introduction' },
      { title: 'Get started' },
      { title: 'Changelog' },
    ],
  },
  {
    title: 'Settings',
    icon: Settings2Icon,
    items: [
      { title: 'General' },
      { title: 'Team' },
      { title: 'Billing' },
    ],
  },
];
</script>

<template>
  <div class="example-sidebar-frame">
    <SidebarProvider
      cookie-name="sidebar_example_state"
      class="example-sidebar-frame__provider"
    >
      <Sidebar
        collapsible="icon"
        class="example-sidebar-frame__sidebar"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                tooltip="Acme Inc"
              >
                <div class="example-sidebar-frame__logo">
                  <GalleryVerticalEndIcon class="example-sidebar-frame__icon" />
                </div>
                <div class="example-sidebar-frame__label">
                  <span class="example-sidebar-frame__title">Acme Inc</span>
                  <span class="example-sidebar-frame__subtitle">Enterprise</span>
                </div>
                <ChevronsUpDownIcon class="example-sidebar-frame__end-icon" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              <Collapsible
                v-for="item in navigation"
                :key="item.title"
                as-child
                :default-open="item.isActive"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger as-child>
                    <SidebarMenuButton :tooltip="item.title">
                      <component :is="item.icon" />
                      <span>{{ item.title }}</span>
                      <ChevronRightIcon class="example-sidebar-frame__chevron" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem
                        v-for="subItem in item.items"
                        :key="subItem.title"
                      >
                        <SidebarMenuSubButton
                          href="#"
                          :is-active="subItem.isActive"
                          @click.prevent
                        >
                          <span>{{ subItem.title }}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                tooltip="Jane Doe"
              >
                <div class="example-sidebar-frame__avatar">
                  JD
                </div>
                <div class="example-sidebar-frame__label">
                  <span class="example-sidebar-frame__title">Jane Doe</span>
                  <span class="example-sidebar-frame__subtitle">jane@example.com</span>
                </div>
              </SidebarMenuButton>
              <SidebarMenuAction
                show-on-hover
                aria-label="More"
              >
                <MoreHorizontalIcon />
              </SidebarMenuAction>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header class="example-sidebar-frame__header">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            class="example-sidebar-frame__separator"
          />
          <span class="example-sidebar-frame__page-title">Overview</span>
        </header>
        <div class="example-sidebar-frame__body">
          <div class="example-sidebar-frame__grid">
            <div class="example-sidebar-frame__card" />
            <div class="example-sidebar-frame__card" />
            <div class="example-sidebar-frame__card" />
          </div>
          <div class="example-sidebar-frame__panel" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .example-sidebar-frame {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 520px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    transform: translateZ(0);
  }

  .example-sidebar-frame .example-sidebar-frame__provider {
    height: 100%;
    min-height: 100%;
  }

  .example-sidebar-frame .example-sidebar-frame__sidebar {
    height: 100%;
  }

  .example-sidebar-frame__logo {
    display: flex;
    width: calc(var(--spacing) * 8);
    height: calc(var(--spacing) * 8);
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    background-color: var(--primary);
    color: var(--primary-foreground);
  }

  .example-sidebar-frame__avatar {
    display: flex;
    width: calc(var(--spacing) * 8);
    height: calc(var(--spacing) * 8);
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    background-color: var(--secondary);
    font-size: 0.75rem;
    font-weight: 500;
  }

  .example-sidebar-frame__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }

  .example-sidebar-frame__label {
    display: grid;
    flex: 1;
    font-size: 0.875rem;
    line-height: 1.25;
    text-align: left;
  }

  .example-sidebar-frame__title {
    overflow: hidden;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .example-sidebar-frame__subtitle {
    overflow: hidden;
    color: var(--muted-foreground);
    font-size: 0.75rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .example-sidebar-frame__end-icon {
    margin-left: auto;
  }

  .example-sidebar-frame__chevron {
    margin-left: auto;
    transition: transform 200ms;
  }

  .sigma-ui-sidebar-menu-item[data-state="open"] .example-sidebar-frame__chevron {
    transform: rotate(90deg);
  }

  .example-sidebar-frame__header {
    display: flex;
    height: calc(var(--spacing) * 14);
    flex-shrink: 0;
    align-items: center;
    padding: 0 calc(var(--spacing) * 4);
    border-bottom: 1px solid var(--border);
    gap: calc(var(--spacing) * 2);
  }

  .example-sidebar-frame .example-sidebar-frame__separator {
    height: calc(var(--spacing) * 4);
    margin-right: calc(var(--spacing) * 2);
  }

  .example-sidebar-frame__page-title {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .example-sidebar-frame__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: calc(var(--spacing) * 4);
    gap: calc(var(--spacing) * 4);
  }

  .example-sidebar-frame__grid {
    display: grid;
    gap: calc(var(--spacing) * 4);
    grid-auto-rows: min-content;
  }

  @media (width >= 48rem) {
    .example-sidebar-frame__grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .example-sidebar-frame__card {
    border-radius: calc(var(--radius) + 4px);
    aspect-ratio: 16 / 9;
    background-color: color-mix(in oklch, var(--muted) 50%, transparent);
  }

  .example-sidebar-frame__panel {
    min-height: calc(var(--spacing) * 24);
    flex: 1;
    border-radius: calc(var(--radius) + 4px);
    background-color: color-mix(in oklch, var(--muted) 50%, transparent);
  }
}
</style>
