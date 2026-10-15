<script setup lang="ts">
import { FolderIcon, InboxIcon, MoreHorizontalIcon, PlusIcon, SendIcon, StarIcon, Trash2Icon } from 'lucide-vue-next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/registry/css/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarSeparator,
} from '@ui/registry/css/ui/sidebar';

const mailboxes = [
  { title: 'Inbox', icon: InboxIcon, count: 128, isActive: true },
  { title: 'Starred', icon: StarIcon, count: 9 },
  { title: 'Sent', icon: SendIcon },
  { title: 'Trash', icon: Trash2Icon, count: 23 },
];

const projects = ['Design system', 'Marketing site'];
</script>

<template>
  <div class="example-sidebar-extras">
    <SidebarProvider
      cookie-name=""
      class="example-sidebar-extras__provider"
    >
      <Sidebar
        collapsible="none"
        class="example-sidebar-extras__sidebar"
      >
        <SidebarHeader>
          <SidebarInput placeholder="Search mail..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Mailboxes</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  v-for="mailbox in mailboxes"
                  :key="mailbox.title"
                >
                  <SidebarMenuButton :is-active="mailbox.isActive">
                    <component :is="mailbox.icon" />
                    <span>{{ mailbox.title }}</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge v-if="mailbox.count">
                    {{ mailbox.count }}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupAction
              title="Add project"
              aria-label="Add project"
            >
              <PlusIcon />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  v-for="project in projects"
                  :key="project"
                >
                  <SidebarMenuButton>
                    <FolderIcon />
                    <span>{{ project }}</span>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <SidebarMenuAction
                        show-on-hover
                        aria-label="More"
                      >
                        <MoreHorizontalIcon />
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="right"
                      align="start"
                    >
                      <DropdownMenuItem>View project</DropdownMenuItem>
                      <DropdownMenuItem>Share project</DropdownMenuItem>
                      <DropdownMenuItem>Delete project</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuSkeleton show-icon />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main class="example-sidebar-extras__main">
        Select a mailbox
      </main>
    </SidebarProvider>
  </div>
</template>

<style>
.example-sidebar-extras {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 480px;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  transform: translateZ(0);
}

.example-sidebar-extras .example-sidebar-extras__provider {
  height: 100%;
  min-height: 100%;
}

.example-sidebar-extras .example-sidebar-extras__sidebar {
  border-right: 1px solid hsl(var(--border));
}

.example-sidebar-extras__main {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
}
</style>
