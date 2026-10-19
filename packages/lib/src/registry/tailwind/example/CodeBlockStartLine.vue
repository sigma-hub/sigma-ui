<script setup lang="ts">
import { FileCodeIcon } from '@lucide/vue';
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
  useHighlightedCode,
} from '@ui/registry/tailwind/ui/code-block';

const code = `router.beforeEach(async (to) => {
  const session = useSession();

  if (to.meta.requiresAuth && !session.user) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }
});`;

const { lines } = useHighlightedCode(code, 'ts');
</script>

<template>
  <CodeBlock>
    <CodeBlockHeader>
      <CodeBlockTitle>
        <FileCodeIcon />
        src/router/index.ts
      </CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent
      :code="code"
      :lines="lines"
      language="ts"
      line-numbers
      :start-line="96"
      highlight-lines="4-6"
    />
  </CodeBlock>
</template>
