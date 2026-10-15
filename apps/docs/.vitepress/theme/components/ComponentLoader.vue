<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { getBlockComponentName } from '../utils/blocks';
import Spinner from './Spinner.vue';
import { useConfigStore } from '@/stores/config';

const props = defineProps<{
  name: string;
  typeName?: 'example' | 'block';
}>();
const { config } = useConfigStore();

const Component = defineAsyncComponent({
  loadingComponent: Spinner,
  loader: () => props.typeName === 'example'
    ? import(`@ui/registry/${config.value.styleSystem}/${props.typeName}/${props.name}.vue`)
    : import(`@ui/registry/${config.value.styleSystem}/blocks/${props.name}/${getBlockComponentName(props.name)}.vue`),
  timeout: 5000,
});
</script>

<template>
  <Component :is="Component" />
</template>
