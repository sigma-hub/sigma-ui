<script setup lang="ts">
import { PaletteIcon } from '@lucide/vue';
import {
  type CodeBlockThemes,
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
  useHighlightedCode,
} from '@ui/registry/css/ui/code-block';

const themes: CodeBlockThemes = {
  light: () => import('shiki/themes/github-light.mjs'),
  dark: () => import('shiki/themes/github-dark.mjs'),
};

const code = `const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatPrice(cents: number) {
  return formatter.format(cents / 100);
}`;

const { lines } = useHighlightedCode(code, 'ts', { themes });
</script>

<template>
  <CodeBlock>
    <CodeBlockHeader>
      <CodeBlockTitle>
        <PaletteIcon />
        GitHub light and dark
      </CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent
      :code="code"
      :lines="lines"
      language="ts"
    />
  </CodeBlock>
</template>
