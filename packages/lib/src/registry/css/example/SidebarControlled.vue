<script setup lang="ts">
import { ref } from 'vue';
import { CalendarIcon, HomeIcon, InboxIcon } from '@lucide/vue';
import { Button } from '@ui/registry/css/ui/button';
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
} from '@ui/registry/css/ui/sidebar';

const isOpen = ref(true);

const items = [
  { title: 'Home', icon: HomeIcon },
  { title: 'Inbox', icon: InboxIcon },
  { title: 'Calendar', icon: CalendarIcon },
];
</script>

<template>
  <div class="example-sidebar-controlled">
    <SidebarProvider
      v-model:open="isOpen"
      cookie-name=""
      class="example-sidebar-controlled__provider"
    >
      <SidebarInset>
        <div class="example-sidebar-controlled__main">
          <Button
            variant="outline"
            @click="isOpen = !isOpen"
          >
            {{ isOpen ? 'Close sidebar' : 'Open sidebar' }}
          </Button>
          <p class="example-sidebar-controlled__text">
            The sidebar is {{ isOpen ? 'open' : 'closed' }}.
          </p>
        </div>
      </SidebarInset>
      <Sidebar
        side="right"
        class="example-sidebar-controlled__sidebar"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  v-for="item in items"
                  :key="item.title"
                >
                  <SidebarMenuButton>
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  </div>
</template>

<style>
.example-sidebar-controlled {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 360px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transform: translateZ(0);
}

.example-sidebar-controlled .example-sidebar-controlled__provider {
  height: 100%;
  min-height: 100%;
}

.example-sidebar-controlled .example-sidebar-controlled__sidebar {
  height: 100%;
}

.example-sidebar-controlled__main {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  padding: calc(var(--spacing) * 4);
  gap: calc(var(--spacing) * 4);
}

.example-sidebar-controlled__text {
  margin: 0;
  color: var(--muted-foreground);
  font-size: 0.875rem;
}
</style>
