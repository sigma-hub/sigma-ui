<script setup lang="ts">
import {
  ChevronsUpDownIcon,
  ChevronRightIcon,
  GalleryVerticalEndIcon,
  MoreHorizontalIcon,
} from '@lucide/vue';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@ui/registry/css/ui/collapsible';
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
} from '@ui/registry/css/ui/sidebar';
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
            <div class="dashboard-app-shell__logo">
              <GalleryVerticalEndIcon class="dashboard-app-shell__icon" />
            </div>
            <div class="dashboard-app-shell__label">
              <span class="dashboard-app-shell__title">{{ workspaceName }}</span>
              <span class="dashboard-app-shell__subtitle">{{ workspacePlan }}</span>
            </div>
            <ChevronsUpDownIcon class="dashboard-app-shell__icon" />
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
            class="dashboard-app-shell__section"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger as-child>
                <SidebarMenuButton :tooltip="section.title">
                  <component :is="section.icon" />
                  <span>{{ section.title }}</span>
                  <ChevronRightIcon class="dashboard-app-shell__chevron" />
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
            <div class="dashboard-app-shell__avatar">
              {{ userInitials }}
            </div>
            <div class="dashboard-app-shell__label">
              <span class="dashboard-app-shell__title">{{ userName }}</span>
              <span class="dashboard-app-shell__subtitle">{{ userEmail }}</span>
            </div>
          </SidebarMenuButton>
          <SidebarMenuAction show-on-hover>
            <MoreHorizontalIcon />
            <span class="dashboard-app-shell__sr-only">{{ moreLabel }}</span>
          </SidebarMenuAction>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>

<style>
@layer base, components;

@layer components {
  .dashboard-app-shell__logo {
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

  .dashboard-app-shell__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    margin-left: auto;
  }

  .dashboard-app-shell__logo .dashboard-app-shell__icon {
    margin-left: 0;
  }

  .dashboard-app-shell__label {
    display: grid;
    flex: 1;
    font-size: 0.875rem;
    line-height: 1.25;
    text-align: left;
  }

  .dashboard-app-shell__title {
    overflow: hidden;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dashboard-app-shell__subtitle {
    overflow: hidden;
    color: var(--muted-foreground);
    font-size: 0.75rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dashboard-app-shell__chevron {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    margin-left: auto;
    transition: transform 200ms;
  }

  .sigma-ui-sidebar-menu-item[data-state="open"] .dashboard-app-shell__chevron {
    transform: rotate(90deg);
  }

  .dashboard-app-shell__avatar {
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

  .dashboard-app-shell__sr-only {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    border-width: 0;
    margin: -1px;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
}
</style>
