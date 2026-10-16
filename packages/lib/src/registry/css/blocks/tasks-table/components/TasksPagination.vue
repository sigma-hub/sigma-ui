<script setup lang="ts">
import type { Table } from '@tanstack/vue-table';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/registry/css/ui/select';
import {
  firstPageLabel,
  lastPageLabel,
  nextPageLabel,
  ofLabel,
  pageLabel,
  previousPageLabel,
  rowsPerPageLabel,
  selectedRowsLabel,
  type Task,
} from '../data';

const props = defineProps<{
  table: Table<Task>;
}>();

const pageSizes = [10, 20, 30, 40, 50];

function updatePageSize(pageSize: unknown) {
  const size = Number(pageSize);

  if (Number.isNaN(size)) {
    return;
  }

  props.table.setPageSize(size);
}
</script>

<template>
  <div class="tasks-table__pagination">
    <div class="tasks-table__selection">
      {{ table.getFilteredSelectedRowModel().rows.length }} {{ ofLabel }}
      {{ table.getFilteredRowModel().rows.length }} {{ selectedRowsLabel }}
    </div>
    <div class="tasks-table__pagination-controls">
      <div class="tasks-table__page-size">
        <p class="tasks-table__page-size-label">
          {{ rowsPerPageLabel }}
        </p>
        <Select
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="updatePageSize"
        >
          <SelectTrigger class="tasks-table__page-size-trigger">
            <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem
              v-for="pageSize in pageSizes"
              :key="pageSize"
              :value="`${pageSize}`"
            >
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="tasks-table__page-count">
        {{ pageLabel }} {{ table.getState().pagination.pageIndex + 1 }} {{ ofLabel }}
        {{ table.getPageCount() }}
      </div>
      <div class="tasks-table__page-buttons">
        <Button
          variant="outline"
          class="tasks-table__page-button tasks-table__page-button--wide"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <span class="tasks-table__sr-only">{{ firstPageLabel }}</span>
          <ChevronsLeftIcon class="tasks-table__page-icon" />
        </Button>
        <Button
          variant="outline"
          class="tasks-table__page-button"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="tasks-table__sr-only">{{ previousPageLabel }}</span>
          <ChevronLeftIcon class="tasks-table__page-icon" />
        </Button>
        <Button
          variant="outline"
          class="tasks-table__page-button"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="tasks-table__sr-only">{{ nextPageLabel }}</span>
          <ChevronRightIcon class="tasks-table__page-icon" />
        </Button>
        <Button
          variant="outline"
          class="tasks-table__page-button tasks-table__page-button--wide"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="tasks-table__sr-only">{{ lastPageLabel }}</span>
          <ChevronsRightIcon class="tasks-table__page-icon" />
        </Button>
      </div>
    </div>
  </div>
</template>

<style>
.tasks-table__pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
}

.tasks-table__selection {
  flex: 1;
  color: var(--muted-foreground);
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.tasks-table__pagination-controls,
.tasks-table__page-size,
.tasks-table__page-buttons {
  display: flex;
  align-items: center;
}

.tasks-table__pagination-controls {
  gap: 1.5rem;
}

.tasks-table__page-size {
  gap: 0.5rem;
}

.tasks-table__page-size-label,
.tasks-table__page-count {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
}

.tasks-table__page-size-trigger {
  width: 70px;
  height: 2rem;
}

.tasks-table__page-count {
  display: flex;
  width: 100px;
  align-items: center;
  justify-content: center;
}

.tasks-table__page-buttons {
  gap: 0.5rem;
}

.tasks-table__page-button {
  width: 2rem;
  height: 2rem;
  padding: 0;
}

.tasks-table__page-button--wide {
  display: none;
}

.tasks-table__page-icon {
  width: 1rem;
  height: 1rem;
}

.tasks-table__sr-only {
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

@media (width >= 1024px) {
  .tasks-table__pagination-controls {
    gap: 2rem;
  }

  .tasks-table__page-button--wide {
    display: flex;
  }
}
</style>
