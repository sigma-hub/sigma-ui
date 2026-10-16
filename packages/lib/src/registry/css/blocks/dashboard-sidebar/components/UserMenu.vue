<script setup lang="ts">
import { CircleUserIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@ui/registry/css/ui/dropdown-menu';
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
        variant="secondary"
        size="icon"
        class="dashboard-sidebar__user-button"
      >
        <CircleUserIcon class="dashboard-sidebar__icon-md" />
        <span class="dashboard-sidebar__sr-only">{{ triggerLabel }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <template
        v-for="entry in entries"
        :key="entry.id"
      >
        <DropdownMenuLabel v-if="entry.kind === 'label'">
          {{ entry.label }}
        </DropdownMenuLabel>
        <DropdownMenuSeparator v-else-if="entry.kind === 'separator'" />
        <DropdownMenuItem v-else-if="entry.kind === 'action'">
          {{ entry.label }}
        </DropdownMenuItem>
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style>
.dashboard-sidebar__user-button.dashboard-sidebar__user-button {
  border-radius: 9999px;
}

.dashboard-sidebar__icon-md {
  width: 1.25rem;
  height: 1.25rem;
}

.dashboard-sidebar__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
