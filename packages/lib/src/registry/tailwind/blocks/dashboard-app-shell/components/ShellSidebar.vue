<script setup lang="ts">
import {
  ChevronsUpDownIcon,
  ChevronRightIcon,
  GalleryVerticalEndIcon,
  MoreHorizontalIcon,
} from '@lucide/vue';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@ui/registry/tailwind/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@ui/registry/tailwind/ui/sidebar';
import type { ShellSection } from '../data';

defineProps<{
  workspaceName: string;
  workspacePlan: string;
  groupLabel: string;
  sections: ShellSection[];
  userName: string;
  userEmail: string;
  userInitials: string;
  moreLabel: string;
}>();
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            :tooltip="workspaceName"
          >
            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GalleryVerticalEndIcon class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{{ workspaceName }}</span>
              <span class="truncate text-xs text-muted-foreground">{{ workspacePlan }}</span>
            </div>
            <ChevronsUpDownIcon class="ml-auto" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>{{ groupLabel }}</SidebarGroupLabel>
        <SidebarMenu>
          <Collapsible
            v-for="section in sections"
            :key="section.title"
            as-child
            :default-open="section.isActive"
            class="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger as-child>
                <SidebarMenuButton :tooltip="section.title">
                  <component :is="section.icon" />
                  <span>{{ section.title }}</span>
                  <ChevronRightIcon class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem
                    v-for="link in section.links"
                    :key="link.title"
                  >
                    <SidebarMenuSubButton
                      href="#"
                      :is-active="link.isActive"
                      @click.prevent
                    >
                      <span>{{ link.title }}</span>
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
            :tooltip="userName"
          >
            <div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-medium">
              {{ userInitials }}
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{{ userName }}</span>
              <span class="truncate text-xs text-muted-foreground">{{ userEmail }}</span>
            </div>
          </SidebarMenuButton>
          <SidebarMenuAction show-on-hover>
            <MoreHorizontalIcon />
            <span class="sr-only">{{ moreLabel }}</span>
          </SidebarMenuAction>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
