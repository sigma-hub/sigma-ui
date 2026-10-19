<script setup lang="ts">
import { CircleUserIcon } from '@lucide/vue';
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
        class="dashboard-analytics__user-button"
      >
        <CircleUserIcon class="dashboard-analytics__icon-md" />
        <span class="dashboard-analytics__sr-only">{{ triggerLabel }}</span>
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
@layer components {
  .dashboard-analytics__user-button.dashboard-analytics__user-button {
    border-radius: 9999px;
  }

  .dashboard-analytics__icon-md {
    width: calc(var(--spacing) * 5);
    height: calc(var(--spacing) * 5);
  }

  .dashboard-analytics__sr-only {
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
