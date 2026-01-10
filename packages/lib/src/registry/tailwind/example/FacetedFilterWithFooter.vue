<script setup lang="ts">
import { ref } from 'vue';
import { FacetedFilter } from '@ui/registry/tailwind/ui/faceted-filter';
import { Button } from '@ui/registry/tailwind/ui/button';

const selectedPriorities = ref<string[]>([]);

const priorityOptions = [
  'Low',
  'Medium',
  'High',
  'Critical',
];

function clearFilters() {
  selectedPriorities.value = [];
}
</script>

<template>
  <FacetedFilter
    v-model="selectedPriorities"
    title="Priority"
    :options="priorityOptions"
  >
    <template #footer>
      <Button
        variant="ghost"
        size="sm"
        class="w-full justify-center"
        @click="clearFilters"
      >
        Clear filters
      </Button>
    </template>
  </FacetedFilter>
</template>
