<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import { FlexRender, useTable } from '@tanstack/vue-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/registry/tailwind/ui/table';
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
  <div class="space-y-4">
    <TasksToolbar :table="table" />
    <div class="rounded-md border">
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
              class="h-24 text-center"
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
