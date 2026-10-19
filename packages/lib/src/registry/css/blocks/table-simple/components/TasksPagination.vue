<script setup lang="ts">
import type { Table } from '@tanstack/vue-table';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from '@lucide/vue';
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
import type { TasksTableFeatures } from './features';

const props = defineProps<{
  table: Table<TasksTableFeatures, Task>;
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
  <div class="table-simple__pagination">
    <div class="table-simple__selection">
      {{ table.getFilteredSelectedRowModel().rows.length }} {{ ofLabel }}
      {{ table.getFilteredRowModel().rows.length }} {{ selectedRowsLabel }}
    </div>
    <div class="table-simple__pagination-controls">
      <div class="table-simple__page-size">
        <p class="table-simple__page-size-label">
          {{ rowsPerPageLabel }}
        </p>
        <Select
          :model-value="`${table.atoms.pagination.get().pageSize}`"
          @update:model-value="updatePageSize"
        >
          <SelectTrigger class="table-simple__page-size-trigger">
            <SelectValue :placeholder="`${table.atoms.pagination.get().pageSize}`" />
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
      <div class="table-simple__page-count">
        {{ pageLabel }} {{ table.atoms.pagination.get().pageIndex + 1 }} {{ ofLabel }}
        {{ table.getPageCount() }}
      </div>
      <div class="table-simple__page-buttons">
        <Button
          variant="outline"
          class="table-simple__page-button table-simple__page-button--wide"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <span class="table-simple__sr-only">{{ firstPageLabel }}</span>
          <ChevronsLeftIcon class="table-simple__page-icon" />
        </Button>
        <Button
          variant="outline"
          class="table-simple__page-button"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="table-simple__sr-only">{{ previousPageLabel }}</span>
          <ChevronLeftIcon class="table-simple__page-icon" />
        </Button>
        <Button
          variant="outline"
          class="table-simple__page-button"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="table-simple__sr-only">{{ nextPageLabel }}</span>
          <ChevronRightIcon class="table-simple__page-icon" />
        </Button>
        <Button
          variant="outline"
          class="table-simple__page-button table-simple__page-button--wide"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="table-simple__sr-only">{{ lastPageLabel }}</span>
          <ChevronsRightIcon class="table-simple__page-icon" />
        </Button>
      </div>
    </div>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .table-simple__pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 calc(var(--spacing) * 2);
  }

  .table-simple__selection {
    flex: 1;
    color: var(--muted-foreground);
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .table-simple__pagination-controls,
  .table-simple__page-size,
  .table-simple__page-buttons {
    display: flex;
    align-items: center;
  }

  .table-simple__pagination-controls {
    gap: calc(var(--spacing) * 6);
  }

  .table-simple__page-size {
    gap: calc(var(--spacing) * 2);
  }

  .table-simple__page-size-label,
  .table-simple__page-count {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
  }

  .table-simple__page-size-trigger {
    width: 70px;
    height: calc(var(--spacing) * 8);
  }

  .table-simple__page-count {
    display: flex;
    width: 100px;
    align-items: center;
    justify-content: center;
  }

  .table-simple__page-buttons {
    gap: calc(var(--spacing) * 2);
  }

  .table-simple__page-button {
    width: calc(var(--spacing) * 8);
    height: calc(var(--spacing) * 8);
    padding: 0;
  }

  .table-simple__page-button--wide {
    display: none;
  }

  .table-simple__page-icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }

  .table-simple__sr-only {
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

  @media (width >= 64rem) {
    .table-simple__pagination-controls {
      gap: calc(var(--spacing) * 8);
    }

    .table-simple__page-button--wide {
      display: flex;
    }
  }
}
</style>
