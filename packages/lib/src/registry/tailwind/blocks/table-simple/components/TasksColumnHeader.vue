<script setup lang="ts">
import type { Column } from '@tanstack/vue-table';
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon, EyeOffIcon } from '@lucide/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/registry/tailwind/ui/dropdown-menu';
import { ascLabel, descLabel, hideColumnLabel, type Task } from '../data';
import type { TasksTableFeatures } from './features';

defineProps<{
  column: Column<TasksTableFeatures, Task, unknown>;
  title: string;
}>();
</script>

<template>
  <div
    v-if="column.getCanSort()"
    class="flex items-center gap-2"
  >
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          size="sm"
          class="-ml-3 h-8 data-[state=open]:bg-secondary"
        >
          <span>{{ title }}</span>
          <ArrowDownIcon
            v-if="column.getIsSorted() === 'desc'"
            class="ml-2 size-4"
          />
          <ArrowUpIcon
            v-else-if="column.getIsSorted() === 'asc'"
            class="ml-2 size-4"
          />
          <ChevronsUpDownIcon
            v-else
            class="ml-2 size-4"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem @click="column.toggleSorting(false)">
          <ArrowUpIcon class="mr-2 size-3.5 text-muted-foreground/70" />
          {{ ascLabel }}
        </DropdownMenuItem>
        <DropdownMenuItem @click="column.toggleSorting(true)">
          <ArrowDownIcon class="mr-2 size-3.5 text-muted-foreground/70" />
          {{ descLabel }}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="column.toggleVisibility(false)">
          <EyeOffIcon class="mr-2 size-3.5 text-muted-foreground/70" />
          {{ hideColumnLabel }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  <div v-else>
    {{ title }}
  </div>
</template>
