<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BlockPreview from './BlockPreview.vue';

interface RegistryComponent {
  name: string;
  type: string;
  registryDependencies: string[];
  component: () => Promise<any>;
  files: string[];
}

const props = defineProps<{
  dir: string;
}>();

const groupComponents = ref<RegistryComponent[]>([]);

onMounted(async () => {
  const module = await import('../../../__generated/index');
  groupComponents.value = Object.values(module.Index.css)
    .filter(component => component.type === 'components:block' && component.name.toLowerCase().includes(props.dir));
});
</script>

<template>
  <div class="mt-10">
    <div
      v-for="component in groupComponents"
      :key="component.name"
      class="mb-[180px]"
    >
      <BlockPreview
        :name="component.name"
        :block-dir="component.files?.[0]?.split('/')?.at(-2) || ''"
      />
    </div>
  </div>
</template>
