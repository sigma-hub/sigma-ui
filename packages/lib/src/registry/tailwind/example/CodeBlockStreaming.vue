<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { FileCodeIcon, RotateCcwIcon } from '@lucide/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
  useHighlightedCode,
} from '@ui/registry/tailwind/ui/code-block';

const source = `export function useDebouncedRef<T>(value: T, delay = 300) {
  return customRef((track, trigger) => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    return {
      get() {
        track();
        return value;
      },
      set(next: T) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = next;
          trigger();
        }, delay);
      },
    };
  });
}`;

const length = ref(0);
const code = computed(() => source.slice(0, length.value));
const streaming = computed(() => length.value < source.length);
const { lines } = useHighlightedCode(code, 'ts');
let timer: ReturnType<typeof setInterval> | undefined;

function replay() {
  clearInterval(timer);
  length.value = 0;
  timer = setInterval(() => {
    length.value = Math.min(source.length, length.value + 6);

    if (!streaming.value) {
      clearInterval(timer);
    }
  }, 30);
}

onMounted(replay);
onBeforeUnmount(() => clearInterval(timer));
</script>

<template>
  <CodeBlock>
    <CodeBlockHeader>
      <CodeBlockTitle>
        <FileCodeIcon />
        composables/useDebouncedRef.ts
      </CodeBlockTitle>
      <CodeBlockActions>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Replay"
          @click="replay"
        >
          <RotateCcwIcon />
        </Button>
        <CodeBlockCopyButton :disabled="streaming" />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent
      :code="code"
      :lines="lines"
      language="ts"
      line-numbers
      :aria-busy="streaming"
    />
  </CodeBlock>
</template>
