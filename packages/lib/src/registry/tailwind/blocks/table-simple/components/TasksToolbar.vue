<script setup lang="ts">
import type { Table } from '@tanstack/vue-table';
import { computed } from 'vue';
import { XIcon } from '@lucide/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Input } from '@ui/registry/tailwind/ui/input';
import {
  filterPlaceholder,
  priorities,
  priorityFilterTitle,
  resetFiltersLabel,
  statusFilterTitle,
  statuses,
  type Task,
} from '../data';
import TasksFacetedFilter from './TasksFacetedFilter.vue';
import TasksViewOptions from './TasksViewOptions.vue';

const props = defineProps<{
  table: Table<Task>;
}>();

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);

function setTitleFilter(event: Event) {
  const target = event.target;

  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  props.table.getColumn('title')?.setFilterValue(target.value);
}
</script>

<template>
  <div class="flex items-center justify-between gap-2">
    <div class="flex flex-1 flex-wrap items-center gap-2">
      <Input
        :placeholder="filterPlaceholder"
        :model-value="(table.getColumn('title')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="setTitleFilter"
      />
      <TasksFacetedFilter
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        :title="statusFilterTitle"
        :options="statuses"
      />
      <TasksFacetedFilter
        v-if="table.getColumn('priority')"
        :column="table.getColumn('priority')"
        :title="priorityFilterTitle"
        :options="priorities"
      />
      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        {{ resetFiltersLabel }}
        <XIcon class="ml-2 size-4" />
      </Button>
    </div>
    <TasksViewOptions :table="table" />
  </div>
</template>
