<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTabs,
  CodeBlockTabsContent,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  CodeBlockWrapButton,
  useHighlightedCode,
} from '@ui/registry/tailwind/ui/code-block';

const files = [
  {
    name: 'App.vue',
    language: 'vue',
    code: `<script setup lang="ts">
import { Button } from '@/components/ui/button';
<\u002Fscript>

<template>
  <Button variant="outline">
    Get started
  </Button>
</template>`,
  },
  {
    name: 'main.ts',
    language: 'ts',
    code: `import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

createApp(App).mount('#app');`,
  },
  {
    name: 'style.css',
    language: 'css',
    code: `@import "tailwindcss";
@import "tw-animate-css";

:root {
  --radius: 0.5rem;
}`,
  },
];

const highlighted = files.map(file => useHighlightedCode(file.code, file.language).lines);
</script>

<template>
  <CodeBlock>
    <CodeBlockTabs default-value="App.vue">
      <CodeBlockHeader>
        <CodeBlockTabsList aria-label="Files">
          <CodeBlockTabsTrigger
            v-for="file in files"
            :key="file.name"
            :value="file.name"
          >
            {{ file.name }}
          </CodeBlockTabsTrigger>
        </CodeBlockTabsList>
        <CodeBlockActions>
          <CodeBlockWrapButton />
          <CodeBlockCopyButton />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockTabsContent
        v-for="(file, index) in files"
        :key="file.name"
        :value="file.name"
      >
        <CodeBlockContent
          :code="file.code"
          :lines="highlighted[index].value"
          :language="file.language"
          line-numbers
        />
      </CodeBlockTabsContent>
    </CodeBlockTabs>
  </CodeBlock>
</template>
