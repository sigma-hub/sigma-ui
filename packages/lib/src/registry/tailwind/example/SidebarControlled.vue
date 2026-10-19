<script setup lang="ts">
import { ref } from 'vue';
import { CalendarIcon, HomeIcon, InboxIcon } from '@lucide/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
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
} from '@ui/registry/tailwind/ui/sidebar';

const isOpen = ref(true);

const items = [
  { title: 'Home', icon: HomeIcon },
  { title: 'Inbox', icon: InboxIcon },
  { title: 'Calendar', icon: CalendarIcon },
];
</script>

<template>
  <div class="relative h-[360px] w-full overflow-hidden rounded-lg border [transform:translateZ(0)]">
    <SidebarProvider
      v-model:open="isOpen"
      cookie-name=""
      class="h-full min-h-full"
    >
      <SidebarInset>
        <div class="flex flex-1 flex-col items-start gap-4 p-4">
          <Button
            variant="outline"
            @click="isOpen = !isOpen"
          >
            {{ isOpen ? 'Close sidebar' : 'Open sidebar' }}
          </Button>
          <p class="text-sm text-muted-foreground">
            The sidebar is {{ isOpen ? 'open' : 'closed' }}.
          </p>
        </div>
      </SidebarInset>
      <Sidebar
        side="right"
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
