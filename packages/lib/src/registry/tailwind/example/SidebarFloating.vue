<script setup lang="ts">
import { CalendarIcon, HomeIcon, InboxIcon, SearchIcon, SettingsIcon } from '@lucide/vue';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@ui/registry/tailwind/ui/sidebar';

const items = [
  { title: 'Home', icon: HomeIcon, isActive: true },
  { title: 'Inbox', icon: InboxIcon },
  { title: 'Calendar', icon: CalendarIcon },
  { title: 'Search', icon: SearchIcon },
  { title: 'Settings', icon: SettingsIcon },
];
</script>

<template>
  <div class="relative h-[420px] w-full overflow-hidden rounded-lg border bg-secondary/50 [transform:translateZ(0)]">
    <SidebarProvider
      cookie-name=""
      class="h-full min-h-full"
    >
      <Sidebar
        variant="floating"
        collapsible="icon"
        class="h-full"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  v-for="item in items"
                  :key="item.title"
                >
                  <SidebarMenuButton
                    :is-active="item.isActive"
                    :tooltip="item.title"
                  >
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main class="flex flex-1 flex-col gap-4 p-4">
        <SidebarTrigger />
        <div class="flex-1 rounded-xl border border-dashed" />
      </main>
    </SidebarProvider>
  </div>
</template>
