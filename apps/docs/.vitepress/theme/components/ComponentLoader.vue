<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useAttrs, useTemplateRef } from 'vue';
import { buildBlockFrameSrc, buildExampleFrameSrc, isFrameOverflowMessage, resolveFrameExtraHeight } from '../../block-renderer/frame';
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
const frame = useTemplateRef<HTMLIFrameElement>('frame');
const extraHeight = ref(0);

const frameHeight = computed(() => {
  if (props.typeName !== 'example') {
    return '600px';
  }

  return extraHeight.value ? `calc(${props.height} + ${extraHeight.value}px)` : props.height;
});

function onFrameMessage(event: MessageEvent) {
  const element = frame.value;

  if (!element || event.origin !== window.location.origin || event.source !== element.contentWindow || !isFrameOverflowMessage(event.data)) {
    return;
  }

  extraHeight.value = resolveFrameExtraHeight(extraHeight.value, event.data, element.clientHeight - extraHeight.value);
}

onMounted(() => window.addEventListener('message', onFrameMessage));
onUnmounted(() => window.removeEventListener('message', onFrameMessage));

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
    ref="frame"
    :src="frameSrc"
    :title="name"
    class="w-full border-0 bg-background"
    :style="{ height: frameHeight }"
  />
</template>
