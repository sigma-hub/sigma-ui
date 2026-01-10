<script setup lang="ts">
import { ref } from 'vue';
import { FacetedFilter } from '@ui/registry/css/ui/faceted-filter';

const selectedStatuses = ref<string[]>([]);

const statusOptions = [
  'Backlog',
  'Todo',
  'In Progress',
  'Done',
  'Cancelled',
];
</script>

<template>
  <FacetedFilter
    v-model="selectedStatuses"
    title="Status"
    :options="statusOptions"
  />
</template>
