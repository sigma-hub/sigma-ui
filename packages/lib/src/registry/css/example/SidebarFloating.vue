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
} from '@ui/registry/css/ui/sidebar';

const items = [
  { title: 'Home', icon: HomeIcon, isActive: true },
  { title: 'Inbox', icon: InboxIcon },
  { title: 'Calendar', icon: CalendarIcon },
  { title: 'Search', icon: SearchIcon },
  { title: 'Settings', icon: SettingsIcon },
];
</script>

<template>
  <div class="example-sidebar-floating">
    <SidebarProvider
      cookie-name=""
      class="example-sidebar-floating__provider"
    >
      <Sidebar
        variant="floating"
        collapsible="icon"
        class="example-sidebar-floating__sidebar"
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
      <main class="example-sidebar-floating__main">
        <SidebarTrigger />
        <div class="example-sidebar-floating__placeholder" />
      </main>
    </SidebarProvider>
  </div>
</template>

<style>
@layer components {
  .example-sidebar-floating {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 420px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background-color: color-mix(in oklch, var(--secondary) 50%, transparent);
    transform: translateZ(0);
  }

  .example-sidebar-floating .example-sidebar-floating__provider {
    height: 100%;
    min-height: 100%;
  }

  .example-sidebar-floating .example-sidebar-floating__sidebar {
    height: 100%;
  }

  .example-sidebar-floating__main {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: calc(var(--spacing) * 4);
    gap: calc(var(--spacing) * 4);
  }

  .example-sidebar-floating__placeholder {
    flex: 1;
    border: 1px dashed var(--border);
    border-radius: calc(var(--radius) + 4px);
  }
}
</style>
