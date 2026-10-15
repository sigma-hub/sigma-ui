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
} from 'lucide-vue-next';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@ui/registry/tailwind/ui/collapsible';
import { Separator } from '@ui/registry/tailwind/ui/separator';
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
} from '@ui/registry/tailwind/ui/sidebar';

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
  <div class="relative h-[520px] w-full overflow-hidden rounded-lg border [transform:translateZ(0)]">
    <SidebarProvider
      cookie-name="sidebar_example_state"
      class="h-full min-h-full"
    >
      <Sidebar
        collapsible="icon"
        class="h-full"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                tooltip="Acme Inc"
              >
                <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GalleryVerticalEndIcon class="size-4" />
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-medium">Acme Inc</span>
                  <span class="truncate text-xs text-muted-foreground">Enterprise</span>
                </div>
                <ChevronsUpDownIcon class="ml-auto" />
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
                class="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger as-child>
                    <SidebarMenuButton :tooltip="item.title">
                      <component :is="item.icon" />
                      <span>{{ item.title }}</span>
                      <ChevronRightIcon class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
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
                <div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-medium">
                  JD
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-medium">Jane Doe</span>
                  <span class="truncate text-xs text-muted-foreground">jane@example.com</span>
                </div>
              </SidebarMenuButton>
              <SidebarMenuAction show-on-hover>
                <MoreHorizontalIcon />
                <span class="sr-only">More</span>
              </SidebarMenuAction>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header class="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator
            orientation="vertical"
            class="mr-2 h-4!"
          />
          <span class="text-sm font-medium">Overview</span>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4">
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="aspect-video rounded-xl bg-muted/50" />
            <div class="aspect-video rounded-xl bg-muted/50" />
            <div class="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div class="min-h-24 flex-1 rounded-xl bg-muted/50" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
