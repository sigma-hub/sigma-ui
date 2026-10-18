<script setup lang="ts">
import { ref } from 'vue';
import { CircleXIcon } from '@lucide/vue';
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockWrapButton,
} from '@ui/registry/tailwind/ui/code-block';

const wrap = ref(true);
const output = `[vite] Internal server error: [vue/compiler-sfc] Unexpected token, expected "," (14:37) in /home/projects/acme/src/components/OrdersTable.vue. The template expression on line 14 is missing a closing parenthesis before the arrow function body.
  Plugin: vite:vue
  File: /home/projects/acme/src/components/OrdersTable.vue:14:37`;
</script>

<template>
  <CodeBlock v-model:wrap="wrap">
    <CodeBlockHeader>
      <CodeBlockTitle>
        <CircleXIcon />
        Build error
      </CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockWrapButton />
        <CodeBlockCopyButton />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent :code="output" />
  </CodeBlock>
</template>
