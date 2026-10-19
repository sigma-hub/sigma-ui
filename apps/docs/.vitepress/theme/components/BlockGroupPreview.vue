<script setup lang="ts">
import { computed } from 'vue';
import { getBlocksByCategory } from '../utils/blocks';
import BlockPreview from './BlockPreview.vue';

const props = defineProps<{
  category: string;
}>();

const blockNames = computed(() => getBlocksByCategory(props.category).map(block => block.name));
</script>

<template>
  <div class="mt-10">
    <div
      v-for="name in blockNames"
      :key="name"
      class="mb-[180px]"
    >
      <BlockPreview :name="name" />
    </div>
  </div>
</template>
