<script setup lang="ts">
import type { Column } from '@tanstack/vue-table';
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon, EyeOffIcon } from '@lucide/vue';
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
    class="table-simple__column-header"
  >
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          size="sm"
          class="table-simple__column-button"
        >
          <span>{{ title }}</span>
          <ArrowDownIcon
            v-if="column.getIsSorted() === 'desc'"
            class="table-simple__column-icon"
          />
          <ArrowUpIcon
            v-else-if="column.getIsSorted() === 'asc'"
            class="table-simple__column-icon"
          />
          <ChevronsUpDownIcon
            v-else
            class="table-simple__column-icon"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem @click="column.toggleSorting(false)">
          <ArrowUpIcon class="table-simple__menu-icon" />
          {{ ascLabel }}
        </DropdownMenuItem>
        <DropdownMenuItem @click="column.toggleSorting(true)">
          <ArrowDownIcon class="table-simple__menu-icon" />
          {{ descLabel }}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="column.toggleVisibility(false)">
          <EyeOffIcon class="table-simple__menu-icon" />
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
.table-simple__column-header {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
}

.table-simple__column-button {
  height: calc(var(--spacing) * 8);
  margin-left: calc(var(--spacing) * -3);
}

.table-simple__column-button[data-state='open'] {
  background: var(--secondary);
}

.table-simple__column-icon,
.table-simple__menu-icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
  margin-left: calc(var(--spacing) * 2);
}

.table-simple__menu-icon {
  width: calc(var(--spacing) * 3.5);
  height: calc(var(--spacing) * 3.5);
  margin-right: calc(var(--spacing) * 2);
  margin-left: 0;
  color: color-mix(in srgb, var(--muted-foreground) 70%, transparent);
}
</style>
