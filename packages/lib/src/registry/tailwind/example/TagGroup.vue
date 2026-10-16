<script setup lang="ts">
import { ref } from 'vue';
import type { AcceptableValue } from 'reka-ui';
import { TagGroup, TagGroupItem, TagGroupItemDelete, TagGroupItemText } from '@ui/registry/tailwind/ui/tag-group';

const tags = ref(['News', 'Travel', 'Gaming']);

function removeTags(values: AcceptableValue[]) {
  tags.value = tags.value.filter(tag => !values.includes(tag));
}
</script>

<template>
  <TagGroup
    class="w-full max-w-sm"
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
      class="px-1 text-sm text-muted-foreground"
    >
      No categories
    </span>
  </TagGroup>
</template>
