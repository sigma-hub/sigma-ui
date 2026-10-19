<script setup lang="ts">
import type { Table } from '@tanstack/vue-table';
import { computed } from 'vue';
import { Settings2Icon } from '@lucide/vue';
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
        class="table-simple__view-button"
      >
        <Settings2Icon class="table-simple__view-icon" />
        {{ viewOptionsLabel }}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      class="table-simple__view-menu"
    >
      <DropdownMenuLabel>{{ toggleColumnsLabel }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem
        v-for="column in columns"
        :key="column.id"
        class="table-simple__view-item"
        :model-value="column.getIsVisible()"
        @update:model-value="setColumnVisibility(column.id, !!$event)"
      >
        {{ column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style>
@layer base, components;

@layer components {
  .table-simple__view-button {
    display: none;
    height: calc(var(--spacing) * 8);
    margin-left: auto;
  }

  .table-simple__view-icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    margin-right: calc(var(--spacing) * 2);
  }

  .table-simple__view-menu {
    width: 150px;
  }

  .table-simple__view-item {
    text-transform: capitalize;
  }

  @media (width >= 64rem) {
    .table-simple__view-button {
      display: flex;
    }
  }
}
</style>
