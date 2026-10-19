<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import { FlexRender, useTable } from '@tanstack/vue-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/registry/css/ui/table';
import { noResultsLabel, type Task } from '../data';
import { tasksTableFeatures, type TasksTableFeatures } from './features';
import TasksPagination from './TasksPagination.vue';
import TasksToolbar from './TasksToolbar.vue';

const props = defineProps<{
  columns: ColumnDef<TasksTableFeatures, Task>[];
  data: Task[];
}>();

// The table owns its sorting, filter, visibility, selection, and pagination state.
const table = useTable({
  features: tasksTableFeatures,
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  enableRowSelection: true,
});
</script>

<template>
  <div class="table-simple__data">
    <TasksToolbar :table="table" />
    <div class="table-simple__frame">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :header="header"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
              >
                <FlexRender :cell="cell" />
              </TableCell>
            </TableRow>
          </template>
          <TableRow v-else>
            <TableCell
              :colspan="columns.length"
              class="table-simple__empty"
            >
              {{ noResultsLabel }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <TasksPagination :table="table" />
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .table-simple__data {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 4);
  }

  .table-simple__frame {
    border: 1px solid var(--border);
    border-radius: calc(var(--radius) - 2px);
  }

  .table-simple__empty {
    height: calc(var(--spacing) * 24);
    text-align: center;
  }
}
</style>
