<script setup lang="ts">
import { FileCodeIcon } from 'lucide-vue-next';
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
  useHighlightedCode,
} from '@ui/registry/css/ui/code-block';

const code = ` import { computed, ref } from 'vue';

 const query = ref('');
-const results = computed(() => search(query.value));
+const debouncedQuery = refDebounced(query, 300);
+const results = computed(() => search(debouncedQuery.value));`;

const { lines } = useHighlightedCode(code, 'ts', { diff: true });
</script>

<template>
  <CodeBlock>
    <CodeBlockHeader>
      <CodeBlockTitle>
        <FileCodeIcon />
        composables/useSearch.ts
      </CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent
      :code="code"
      :lines="lines"
      language="ts"
      diff
      line-numbers
    />
  </CodeBlock>
</template>
