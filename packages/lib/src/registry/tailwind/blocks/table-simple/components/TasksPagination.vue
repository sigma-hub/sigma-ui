<script setup lang="ts">
import type { Table } from '@tanstack/vue-table';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from '@lucide/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/registry/tailwind/ui/select';
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
  <div class="flex items-center justify-between px-2">
    <div class="flex-1 text-sm text-muted-foreground">
      {{ table.getFilteredSelectedRowModel().rows.length }} {{ ofLabel }}
      {{ table.getFilteredRowModel().rows.length }} {{ selectedRowsLabel }}
    </div>
    <div class="flex items-center gap-6 lg:gap-8">
      <div class="flex items-center gap-2">
        <p class="text-sm font-medium">
          {{ rowsPerPageLabel }}
        </p>
        <Select
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="updatePageSize"
        >
          <SelectTrigger class="h-8 w-[70px]">
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
      <div class="flex w-[100px] items-center justify-center text-sm font-medium">
        {{ pageLabel }} {{ table.getState().pagination.pageIndex + 1 }} {{ ofLabel }}
        {{ table.getPageCount() }}
      </div>
      <div class="flex items-center gap-2">
        <Button
          variant="outline"
          class="hidden size-8 p-0 lg:flex"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">{{ firstPageLabel }}</span>
          <ChevronsLeftIcon class="size-4" />
        </Button>
        <Button
          variant="outline"
          class="size-8 p-0"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="sr-only">{{ previousPageLabel }}</span>
          <ChevronLeftIcon class="size-4" />
        </Button>
        <Button
          variant="outline"
          class="size-8 p-0"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="sr-only">{{ nextPageLabel }}</span>
          <ChevronRightIcon class="size-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden size-8 p-0 lg:flex"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="sr-only">{{ lastPageLabel }}</span>
          <ChevronsRightIcon class="size-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
