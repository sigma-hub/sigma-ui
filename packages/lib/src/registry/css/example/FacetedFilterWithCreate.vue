<script setup lang="ts">
import { ref } from 'vue';
import { FacetedFilter } from '@ui/registry/css/ui/faceted-filter';

const selectedTags = ref<string[]>([]);
const tagOptions = ref([
  'Bug',
  'Feature',
  'Documentation',
  'Enhancement',
]);

function handleCreate(value: string) {
  tagOptions.value.push(value);
  selectedTags.value.push(value);
}
</script>

<template>
  <FacetedFilter
    v-model="selectedTags"
    title="Tags"
    :options="tagOptions"
    allow-create
    @create="handleCreate"
  />
</template>
