<script setup lang="ts">
import type { Table } from '@tanstack/vue-table';
import { computed } from 'vue';
import { XIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import { Input } from '@ui/registry/css/ui/input';
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
  <div class="table-simple__toolbar">
    <div class="table-simple__filters">
      <Input
        :placeholder="filterPlaceholder"
        :model-value="(table.getColumn('title')?.getFilterValue() as string) ?? ''"
        class="table-simple__search"
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
        class="table-simple__reset"
        @click="table.resetColumnFilters()"
      >
        {{ resetFiltersLabel }}
        <XIcon class="table-simple__reset-icon" />
      </Button>
    </div>
    <TasksViewOptions :table="table" />
  </div>
</template>

<style>
.table-simple__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--spacing) * 2);
}

.table-simple__filters {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-items: center;
  gap: calc(var(--spacing) * 2);
}

.table-simple__search {
  width: 150px;
  height: calc(var(--spacing) * 8);
}

.table-simple__reset {
  height: calc(var(--spacing) * 8);
  padding: 0 calc(var(--spacing) * 2);
}

.table-simple__reset-icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
  margin-left: calc(var(--spacing) * 2);
}

@media (width >= 64rem) {
  .table-simple__search {
    width: 250px;
  }

  .table-simple__reset {
    padding: 0 calc(var(--spacing) * 3);
  }
}
</style>
