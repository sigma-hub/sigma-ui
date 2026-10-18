<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import {
  buildDemoFrameSrc,
  DEMO_FRAME_MIN_HEIGHT,
  isFrameHeightMessage,
  resolveDemoFrameHeight,
} from '../../block-renderer/frame';
import { useExamplesStore } from '@/stores/examples';

const examplesStore = useExamplesStore();
const frame = ref<HTMLIFrameElement>();
const frameHeight = ref(DEMO_FRAME_MIN_HEIGHT);
const frameSrc = computed(() => (
  examplesStore.currentExample
    ? buildDemoFrameSrc(examplesStore.currentExample.name)
    : undefined
));
const growsWithContent = computed(() => examplesStore.currentExample?.frameHeight === 'content');

// A demo that grows with its content keeps the previous height until it reports its own,
// so switching between two such demos changes the height once instead of collapsing first.
watch(growsWithContent, (grows) => {
  if (!grows) {
    frameHeight.value = DEMO_FRAME_MIN_HEIGHT;
  }
});

function onMessage(event: MessageEvent) {
  if (event.origin !== window.location.origin || event.source !== frame.value?.contentWindow) {
    return;
  }

  if (isFrameHeightMessage(event.data) && growsWithContent.value) {
    frameHeight.value = resolveDemoFrameHeight(event.data.height);
  }
}

onMounted(() => window.addEventListener('message', onMessage));
onUnmounted(() => window.removeEventListener('message', onMessage));
</script>

<template>
  <iframe
    v-if="frameSrc"
    ref="frame"
    :key="examplesStore.currentExample?.name"
    :src="frameSrc"
    :title="examplesStore.currentExample?.name"
    :style="{ height: `${frameHeight}px` }"
    class="w-full border-0 bg-background"
  />
</template>
