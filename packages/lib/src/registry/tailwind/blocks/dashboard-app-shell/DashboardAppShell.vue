<script setup lang="ts">
import { SidebarInset, SidebarProvider } from '@ui/registry/tailwind/ui/sidebar';
import OverviewPanel from './components/OverviewPanel.vue';
import ShellHeader from './components/ShellHeader.vue';
import ShellSidebar from './components/ShellSidebar.vue';
import {
  activity,
  activityTitle,
  groupLabel,
  highlights,
  moreLabel,
  pageTitle,
  sections,
  userEmail,
  userInitials,
  userName,
  workspaceName,
  workspacePlan,
} from './data';
</script>

<template>
  <SidebarProvider cookie-name="sidebar_app_shell">
    <ShellSidebar
      :workspace-name="workspaceName"
      :workspace-plan="workspacePlan"
      :group-label="groupLabel"
      :sections="sections"
      :user-name="userName"
      :user-email="userEmail"
      :user-initials="userInitials"
      :more-label="moreLabel"
    />
    <SidebarInset>
      <ShellHeader :title="pageTitle" />
      <OverviewPanel
        :highlights="highlights"
        :activity-title="activityTitle"
        :activity="activity"
      />
    </SidebarInset>
  </SidebarProvider>
</template>
