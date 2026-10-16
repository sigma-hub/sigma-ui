<script setup lang="ts">
import { computed } from 'vue';
import { buildDemoFrameSrc } from '../../block-renderer/frame';
import { useExamplesStore } from '@/stores/examples';

const examplesStore = useExamplesStore();
const frameSrc = computed(() => (
  examplesStore.currentExample
    ? buildDemoFrameSrc(examplesStore.currentExample.name)
    : undefined
));
</script>

<template>
  <iframe
    v-if="frameSrc"
    :key="examplesStore.currentExample?.name"
    :src="frameSrc"
    :title="examplesStore.currentExample?.name"
    class="h-[900px] w-full border-0 bg-background"
  />
</template>
