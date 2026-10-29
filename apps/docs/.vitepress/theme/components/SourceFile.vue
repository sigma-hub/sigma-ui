<script setup lang="ts">
import { ref } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { ChevronDownIcon, FileCodeIcon } from '@lucide/vue';
import { useCodePathRewrite } from '../composables/useCodePathRewrite';

defineProps<{
  name: string;
  html: string;
}>();

const codeContainer = ref<HTMLElement>();
const isExpanded = ref(false);
const isOverflowing = ref(false);

const rewriteCodePaths = useCodePathRewrite();

useResizeObserver(codeContainer, () => {
  if (codeContainer.value && !isExpanded.value) {
    isOverflowing.value = codeContainer.value.scrollHeight > codeContainer.value.clientHeight;
  }
});
</script>

<template>
  <div
    class="my-4 overflow-hidden rounded-lg border"
  >
    <div class="flex items-center gap-2 border-b bg-muted/50 px-4 py-2 text-sm font-medium">
      <FileCodeIcon class="h-4 w-4 text-muted-foreground" />
      <span class="font-mono">{{ name }}</span>
    </div>
    <div
      ref="codeContainer"
      class="source-file-code relative"
      :class="{ 'max-h-64 overflow-hidden': !isExpanded }"
    >
      <div v-html="rewriteCodePaths(html)" />
      <div
        v-if="isOverflowing && !isExpanded"
        class="absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-gradient-to-t from-[var(--code-bg)] to-transparent pb-3"
      >
        <button
          type="button"
          class="flex items-center gap-1 rounded-md border bg-background px-3 py-1 text-xs font-medium text-foreground shadow-xs hover:bg-accent"
          @click="isExpanded = true"
        >
          Expand
          <ChevronDownIcon class="h-3 w-3" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.source-file-code :deep(div[class*='language-']) {
  max-height: none;
  margin: 0;
  border: 0;
  border-radius: 0;
}
</style>
