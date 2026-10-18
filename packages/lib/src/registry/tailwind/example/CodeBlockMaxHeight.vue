<script setup lang="ts">
import { ScrollTextIcon } from 'lucide-vue-next';
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from '@ui/registry/tailwind/ui/code-block';

const statuses = [200, 200, 201, 200, 304, 200, 404, 200];
const output = Array.from({ length: 40 }, (_, index) => {
  const id = String(index + 1).padStart(2, '0');
  const status = statuses[index % statuses.length];
  return `[${id}] GET /api/orders?page=${index + 1} ${status} in ${12 + ((index * 7) % 40)}ms`;
}).join('\n');
</script>

<template>
  <CodeBlock size="sm">
    <CodeBlockHeader>
      <CodeBlockTitle>
        <ScrollTextIcon />
        Server logs
      </CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent
      :code="output"
      :max-height="240"
    />
  </CodeBlock>
</template>
