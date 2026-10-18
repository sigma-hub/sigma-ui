<script setup lang="ts">
import { FileJsonIcon } from 'lucide-vue-next';
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
  useHighlightedCode,
} from '@ui/registry/tailwind/ui/code-block';

const code = `{
  "name": "acme-dashboard",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "reka-ui": "^2.11.0",
    "vue": "^3.5.44"
  }
}`;

const { lines } = useHighlightedCode(code, 'json');
</script>

<template>
  <CodeBlock>
    <CodeBlockHeader>
      <CodeBlockTitle>
        <FileJsonIcon />
        package.json
      </CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent
      :code="code"
      :lines="lines"
      language="json"
      line-numbers
    />
  </CodeBlock>
</template>
