<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  useHighlightedCode,
} from '@ui/registry/tailwind/ui/code-block';

const code = `VITE_API_URL=https://api.acme.dev
VITE_SENTRY_DSN=https://public@sentry.acme.dev/12
VITE_FEATURE_FLAGS=checkout-v2,search-suggestions`;

const { lines } = useHighlightedCode(code, 'bash');
</script>

<template>
  <CodeBlock>
    <CodeBlockActions>
      <CodeBlockCopyButton />
    </CodeBlockActions>
    <CodeBlockContent
      :code="code"
      :lines="lines"
      language="bash"
    />
  </CodeBlock>
</template>
