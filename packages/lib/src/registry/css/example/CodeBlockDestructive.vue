<script setup lang="ts">
import { TriangleAlertIcon } from '@lucide/vue';
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from '@ui/registry/css/ui/code-block';

const output = `TypeError: Cannot read properties of undefined (reading 'map')
    at setup (src/components/OrdersTable.vue:18:31)
    at callWithErrorHandling (runtime-core.esm-bundler.js:199:19)
    at setupStatefulComponent (runtime-core.esm-bundler.js:7891:25)`;
</script>

<template>
  <CodeBlock variant="destructive">
    <CodeBlockHeader>
      <CodeBlockTitle>
        <TriangleAlertIcon />
        Unhandled error
      </CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent :code="output" />
  </CodeBlock>
</template>
