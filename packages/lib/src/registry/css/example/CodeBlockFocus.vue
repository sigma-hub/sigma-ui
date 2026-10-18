<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockContent,
  useHighlightedCode,
} from '@ui/registry/css/ui/code-block';

const code = `export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
});`;

const { lines } = useHighlightedCode(code, 'ts');
</script>

<template>
  <CodeBlock>
    <CodeBlockContent
      :code="code"
      :lines="lines"
      language="ts"
      line-numbers
      focus-lines="3-7"
    />
  </CodeBlock>
</template>
