<script setup lang="ts">
import type { Table } from '@tanstack/vue-table';
import { computed } from 'vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/registry/tailwind/ui/dropdown-menu';
import { Settings2Icon } from 'lucide-vue-next';
import type { Task } from '../data/schema';

interface DataTableViewOptionsProps {
  table: Table<Task>;
}

const props = defineProps<DataTableViewOptionsProps>();

const columns = computed(() => props.table.getAllColumns()
  .filter(
    column =>
      typeof column.accessorFn !== 'undefined' && column.getCanHide(),
  ));
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        class="ml-auto hidden h-8 lg:flex"
      >
        <Settings2Icon class="mr-2 h-4 w-4" />
        View
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      class="w-[150px]"
    >
      <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuCheckboxItem
        v-for="column in columns"
        :key="column.id"
        class="capitalize"
        :model-value="column.getIsVisible()"
        @update:model-value="(value) => column.toggleVisibility(!!value)"
      >
        {{ column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
