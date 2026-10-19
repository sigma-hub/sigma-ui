<script setup lang="ts">
import { FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@lucide/vue';
import { Separator } from '@ui/registry/tailwind/ui/separator';
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
} from '@ui/registry/tailwind/ui/sidebar';

const items = [
  { title: 'Home', icon: HomeIcon, isActive: true },
  { title: 'Inbox', icon: InboxIcon },
  { title: 'Projects', icon: FolderIcon },
  { title: 'Team', icon: UsersIcon },
];
</script>

<template>
  <div class="relative h-[420px] w-full overflow-hidden rounded-lg border [transform:translateZ(0)]">
    <SidebarProvider
      cookie-name=""
      class="h-full min-h-full"
    >
      <Sidebar
        variant="inset"
        class="h-full"
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
        <header class="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator
            orientation="vertical"
            class="mr-2 h-4!"
          />
          <span class="text-sm font-medium">Home</span>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4">
          <div class="flex-1 rounded-xl bg-muted/50" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
