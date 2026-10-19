<script setup lang="ts">
import type { Table } from '@tanstack/vue-table';
import { computed } from 'vue';
import { Settings2Icon } from '@lucide/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/registry/tailwind/ui/dropdown-menu';
import { toggleColumnsLabel, viewOptionsLabel, type Task } from '../data';
import type { TasksTableFeatures } from './features';

const props = defineProps<{
  table: Table<TasksTableFeatures, Task>;
}>();

const columns = computed(() => props.table.getAllColumns()
  .filter(column => typeof column.accessorFn !== 'undefined' && column.getCanHide()));

function setColumnVisibility(columnId: string, visible: boolean) {
  props.table.getColumn(columnId)?.toggleVisibility(visible);
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        class="ml-auto hidden h-8 lg:flex"
      >
        <Settings2Icon class="mr-2 size-4" />
        {{ viewOptionsLabel }}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      class="w-[150px]"
    >
      <DropdownMenuLabel>{{ toggleColumnsLabel }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem
        v-for="column in columns"
        :key="column.id"
        class="capitalize"
        :model-value="column.getIsVisible()"
        @update:model-value="setColumnVisibility(column.id, !!$event)"
      >
        {{ column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
