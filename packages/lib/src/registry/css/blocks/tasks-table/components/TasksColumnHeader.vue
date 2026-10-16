<script setup lang="ts">
import type { Column } from '@tanstack/vue-table';
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon, EyeOffIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/registry/css/ui/dropdown-menu';
import { ascLabel, descLabel, hideColumnLabel, type Task } from '../data';

defineProps<{
  column: Column<Task, unknown>;
  title: string;
}>();
</script>

<template>
  <div
    v-if="column.getCanSort()"
    class="tasks-table__column-header"
  >
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          size="sm"
          class="tasks-table__column-button"
        >
          <span>{{ title }}</span>
          <ArrowDownIcon
            v-if="column.getIsSorted() === 'desc'"
            class="tasks-table__column-icon"
          />
          <ArrowUpIcon
            v-else-if="column.getIsSorted() === 'asc'"
            class="tasks-table__column-icon"
          />
          <ChevronsUpDownIcon
            v-else
            class="tasks-table__column-icon"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem @click="column.toggleSorting(false)">
          <ArrowUpIcon class="tasks-table__menu-icon" />
          {{ ascLabel }}
        </DropdownMenuItem>
        <DropdownMenuItem @click="column.toggleSorting(true)">
          <ArrowDownIcon class="tasks-table__menu-icon" />
          {{ descLabel }}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="column.toggleVisibility(false)">
          <EyeOffIcon class="tasks-table__menu-icon" />
          {{ hideColumnLabel }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  <div v-else>
    {{ title }}
  </div>
</template>

<style>
.tasks-table__column-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tasks-table__column-button {
  height: 2rem;
  margin-left: -0.75rem;
}

.tasks-table__column-button[data-state='open'] {
  background: var(--secondary);
}

.tasks-table__column-icon,
.tasks-table__menu-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
}

.tasks-table__menu-icon {
  width: 0.875rem;
  height: 0.875rem;
  margin-right: 0.5rem;
  margin-left: 0;
  color: color-mix(in srgb, var(--muted-foreground) 70%, transparent);
}
</style>
