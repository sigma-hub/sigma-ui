<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockContent,
  useHighlightedCode,
} from '@ui/registry/tailwind/ui/code-block';

const code = `const { data, error, isFetching } = useFetch('/api/orders').json();

watch(data, (orders) => {
  console.log(\`Loaded \${orders.length} orders\`);
});`;

const words = ['useFetch', /\bdata\b/];
const { lines } = useHighlightedCode(code, 'ts');
</script>

<template>
  <CodeBlock>
    <CodeBlockContent
      :code="code"
      :lines="lines"
      language="ts"
      :highlight-words="words"
    />
  </CodeBlock>
</template>
