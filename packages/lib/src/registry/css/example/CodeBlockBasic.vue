<script setup lang="ts">
import { CodeBlock, CodeBlockContent } from '@ui/registry/css/ui/code-block';

const output = `$ pnpm build
vite v6.4.4 building for production...
✓ 1204 modules transformed.
dist/index.html                  0.46 kB │ gzip:  0.30 kB
dist/assets/index-BqLm2Ugs.css  18.92 kB │ gzip:  4.61 kB
dist/assets/index-C7Fa1ePq.js   96.37 kB │ gzip: 37.85 kB
✓ built in 2.84s`;
</script>

<template>
  <CodeBlock>
    <CodeBlockContent :code="output" />
  </CodeBlock>
</template>
