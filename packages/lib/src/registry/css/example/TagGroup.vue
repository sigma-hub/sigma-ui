<script setup lang="ts">
import { ref } from 'vue';
import type { AcceptableValue } from 'reka-ui';
import { TagGroup, TagGroupItem, TagGroupItemDelete, TagGroupItemText } from '@ui/registry/css/ui/tag-group';

const tags = ref(['News', 'Travel', 'Gaming']);

function removeTags(values: AcceptableValue[]) {
  tags.value = tags.value.filter(tag => !values.includes(tag));
}
</script>

<template>
  <TagGroup
    class="example-tag-group"
    aria-label="Categories"
    @remove="removeTags"
  >
    <TagGroupItem
      v-for="tag in tags"
      :key="tag"
      :value="tag"
    >
      <TagGroupItemText>{{ tag }}</TagGroupItemText>
      <TagGroupItemDelete />
    </TagGroupItem>
    <span
      v-if="tags.length === 0"
      class="example-tag-group__empty"
    >
      No categories
    </span>
  </TagGroup>
</template>

<style>
.example-tag-group {
  width: 100%;
  max-width: 24rem;
}

.example-tag-group__empty {
  padding: 0 0.25rem;
  color: var(--muted-foreground);
  font-size: 0.875rem;
}
</style>
