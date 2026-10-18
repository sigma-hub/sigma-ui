<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  useHighlightedCode,
} from '@ui/registry/css/ui/code-block';

const code = `// [!code word:theme]
const theme = useColorMode();

function toggle() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'; // [!code highlight]
}

const label = 'Toggle theme'; // [!code --]
const label = computed(() => \`Switch to \${theme.value === 'dark' ? 'light' : 'dark'}\`); // [!code ++]`;

const { lines } = useHighlightedCode(code, 'ts', { notation: true });
</script>

<template>
  <CodeBlock>
    <CodeBlockActions>
      <CodeBlockCopyButton />
    </CodeBlockActions>
    <CodeBlockContent
      :code="code"
      :lines="lines"
      language="ts"
      notation
    />
  </CodeBlock>
</template>
