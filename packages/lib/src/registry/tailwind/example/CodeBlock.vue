<script setup lang="ts">
import { FileCodeIcon } from '@lucide/vue';
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockWrapButton,
  useHighlightedCode,
} from '@ui/registry/tailwind/ui/code-block';

const code = `<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);

function increment() {
  count.value++;
}
<\u002Fscript>

<template>
  <button type="button" @click="increment">
    Clicked {{ count }} times
  </button>
</template>`;

const { lines } = useHighlightedCode(code, 'vue');
</script>

<template>
  <CodeBlock>
    <CodeBlockHeader>
      <CodeBlockTitle>
        <FileCodeIcon />
        components/Counter.vue
      </CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockWrapButton />
        <CodeBlockCopyButton />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent
      :code="code"
      :lines="lines"
      language="vue"
      line-numbers
      highlight-lines="4,6-8"
    />
  </CodeBlock>
</template>
