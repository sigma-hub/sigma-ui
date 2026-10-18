<script setup lang="ts">
import { FolderIcon, InboxIcon, MoreHorizontalIcon, PlusIcon, SendIcon, StarIcon, Trash2Icon } from '@lucide/vue';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/registry/tailwind/ui/dropdown-menu';
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
} from '@ui/registry/tailwind/ui/sidebar';

const mailboxes = [
  { title: 'Inbox', icon: InboxIcon, count: 128, isActive: true },
  { title: 'Starred', icon: StarIcon, count: 9 },
  { title: 'Sent', icon: SendIcon },
  { title: 'Trash', icon: Trash2Icon, count: 23 },
];

const projects = ['Design system', 'Marketing site'];
</script>

<template>
  <div class="relative h-[480px] w-full overflow-hidden rounded-lg border [transform:translateZ(0)]">
    <SidebarProvider
      cookie-name=""
      class="h-full min-h-full"
    >
      <Sidebar
        collapsible="none"
        class="border-r"
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
            <SidebarGroupAction title="Add project">
              <PlusIcon />
              <span class="sr-only">Add project</span>
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
                      <SidebarMenuAction show-on-hover>
                        <MoreHorizontalIcon />
                        <span class="sr-only">More</span>
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
      <main class="flex flex-1 items-center justify-center p-4 text-sm text-muted-foreground">
        Select a mailbox
      </main>
    </SidebarProvider>
  </div>
</template>
