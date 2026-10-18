<script setup lang="ts">
import { Avatar } from '@ui/registry/css/ui/avatar';
import { Button } from '@ui/registry/css/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@ui/registry/css/ui/dropdown-menu';
import type { AccountMenuEntry } from '../data';

defineProps<{
  entries: AccountMenuEntry[];
  triggerLabel: string;
}>();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="dashboard-overview__user-button"
      >
        <Avatar size="sm" />
        <span class="dashboard-overview__sr-only">{{ triggerLabel }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      class="dashboard-overview__user-menu"
      align="end"
    >
      <template
        v-for="entry in entries"
        :key="entry.id"
      >
        <DropdownMenuLabel
          v-if="entry.kind === 'label'"
          class="dashboard-overview__user-label"
        >
          <div class="dashboard-overview__user-identity">
            <p class="dashboard-overview__user-name">
              {{ entry.label }}
            </p>
            <p
              v-if="entry.detail"
              class="dashboard-overview__user-email"
            >
              {{ entry.detail }}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator v-else-if="entry.kind === 'separator'" />
        <DropdownMenuItem v-else-if="entry.kind === 'action'">
          {{ entry.label }}
          <DropdownMenuShortcut v-if="entry.shortcut">
            {{ entry.shortcut }}
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style>
.dashboard-overview__user-button {
  position: relative;
  width: calc(var(--spacing) * 8);
  height: calc(var(--spacing) * 8);
  border-radius: 9999px;
}

.dashboard-overview__user-menu {
  width: calc(var(--spacing) * 56);
}

.dashboard-overview__user-label {
  font-weight: 400;
}

.dashboard-overview__user-identity {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 1);
}

.dashboard-overview__user-name,
.dashboard-overview__user-email {
  margin: 0;
  line-height: 1;
}

.dashboard-overview__user-name {
  font-size: 0.875rem;
  font-weight: 500;
}

.dashboard-overview__user-email {
  color: var(--muted-foreground);
  font-size: 0.75rem;
}

.dashboard-overview__sr-only {
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
</style>
