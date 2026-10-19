<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockLine,
} from '@ui/registry/tailwind/ui/code-block';

const steps = [
  { text: '$ git switch -c feature/code-block', variant: 'default' },
  { text: 'Switched to a new branch \'feature/code-block\'', variant: 'highlighted' },
  { text: '$ git push -u origin feature/code-block', variant: 'default' },
] as const;

const copyText = steps.filter(step => step.text.startsWith('$')).map(step => step.text.slice(2)).join('\n');
</script>

<template>
  <CodeBlock>
    <CodeBlockActions>
      <CodeBlockCopyButton :value="copyText" />
    </CodeBlockActions>
    <CodeBlockContent>
      <CodeBlockLine
        v-for="step in steps"
        :key="step.text"
        :variant="step.variant"
      >
        {{ step.text }}
      </CodeBlockLine>
    </CodeBlockContent>
  </CodeBlock>
</template>
