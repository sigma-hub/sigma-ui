<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { buildBlockFrameSrc, buildExampleFrameSrc } from '../../block-renderer/frame';
import { getBlockMeta } from '../utils/blocks';
import { useConfigStore } from '@/stores/config';

const props = withDefaults(defineProps<{
  name: string;
  typeName?: 'example' | 'block';
  align?: 'center' | 'start' | 'end';
  height?: string;
}>(), {
  typeName: 'block',
  align: 'center',
  height: '350px',
});

const attrs = useAttrs();
const { config } = useConfigStore();

const frameSrc = computed(() => {
  if (props.typeName === 'example') {
    return buildExampleFrameSrc({
      name: props.name,
      styleSystem: config.value.styleSystem,
      className: typeof attrs.class === 'string' ? attrs.class : undefined,
      align: props.align,
    });
  }

  return buildBlockFrameSrc({
    name: props.name,
    styleSystem: config.value.styleSystem,
    containerClass: getBlockMeta(props.name)?.meta.containerClass ?? '',
  });
});
</script>

<template>
  <iframe
    :src="frameSrc"
    :title="name"
    class="w-full border-0 bg-background"
    :style="{ height: typeName === 'example' ? height : '600px' }"
  />
</template>
