<script setup lang="ts">
import { ref } from 'vue';
import { FacetedFilter } from '@ui/registry/css/ui/faceted-filter';
import { Button } from '@ui/registry/css/ui/button';

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
        class="example-sigma-ui-faceted-filter-footer__button"
        @click="clearFilters"
      >
        Clear filters
      </Button>
    </template>
  </FacetedFilter>
</template>

<style>
.example-sigma-ui-faceted-filter-footer__button {
  width: 100%;
  justify-content: center;
}
</style>
