<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockContent,
  useHighlightedCode,
} from '@ui/registry/css/ui/code-block';

const code = `export function formatPrice(amount: number, currency = 'USD') {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });

  return formatter.format(amount);
}

export const total = formatPrice(42.5);`;

const { lines } = useHighlightedCode(code, 'ts');
</script>

<template>
  <CodeBlock>
    <CodeBlockContent
      :code="code"
      :lines="lines"
      language="ts"
      line-numbers
      highlight-lines="2-5,8"
    />
  </CodeBlock>
</template>
