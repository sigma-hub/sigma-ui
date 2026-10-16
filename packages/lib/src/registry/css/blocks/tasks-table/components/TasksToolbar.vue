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
  <div class="tasks-table__toolbar">
    <div class="tasks-table__filters">
      <Input
        :placeholder="filterPlaceholder"
        :model-value="(table.getColumn('title')?.getFilterValue() as string) ?? ''"
        class="tasks-table__search"
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
        class="tasks-table__reset"
        @click="table.resetColumnFilters()"
      >
        {{ resetFiltersLabel }}
        <XIcon class="tasks-table__reset-icon" />
      </Button>
    </div>
    <TasksViewOptions :table="table" />
  </div>
</template>

<style>
.tasks-table__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.tasks-table__filters {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.tasks-table__search {
  width: 150px;
  height: 2rem;
}

.tasks-table__reset {
  height: 2rem;
  padding: 0 0.5rem;
}

.tasks-table__reset-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
}

@media (width >= 1024px) {
  .tasks-table__search {
    width: 250px;
  }

  .tasks-table__reset {
    padding: 0 0.75rem;
  }
}
</style>
