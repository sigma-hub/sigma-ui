<script setup lang="ts">
import type { Table } from '@tanstack/vue-table';
import { computed } from 'vue';
import { Settings2Icon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/registry/css/ui/dropdown-menu';
import { toggleColumnsLabel, viewOptionsLabel, type Task } from '../data';

const props = defineProps<{
  table: Table<Task>;
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
        class="tasks-table__view-button"
      >
        <Settings2Icon class="tasks-table__view-icon" />
        {{ viewOptionsLabel }}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      class="tasks-table__view-menu"
    >
      <DropdownMenuLabel>{{ toggleColumnsLabel }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem
        v-for="column in columns"
        :key="column.id"
        class="tasks-table__view-item"
        :model-value="column.getIsVisible()"
        @update:model-value="setColumnVisibility(column.id, !!$event)"
      >
        {{ column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style>
.tasks-table__view-button {
  display: none;
  height: 2rem;
  margin-left: auto;
}

.tasks-table__view-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}

.tasks-table__view-menu {
  width: 150px;
}

.tasks-table__view-item {
  text-transform: capitalize;
}

@media (width >= 1024px) {
  .tasks-table__view-button {
    display: flex;
  }
}
</style>
