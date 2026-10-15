<script setup lang="ts">
import { computed } from 'vue';
import { Index } from '../../../__generated';
import { getBlocksByCategory } from '../utils/blocks';
import BlockPreview from './BlockPreview.vue';
import { useConfigStore } from '@/stores/config';

const props = defineProps<{
  category: string;
}>();

const { config } = useConfigStore();

const blockNames = computed(() => {
  const styleIndex: Record<string, { type: string }> = Index[config.value.styleSystem];

  return getBlocksByCategory(props.category)
    .map(block => block.name)
    .filter(name => styleIndex[name]?.type === 'registry:block');
});
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
