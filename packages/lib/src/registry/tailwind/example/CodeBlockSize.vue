<script setup lang="ts">
import { WrenchIcon } from '@lucide/vue';
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
  useHighlightedCode,
} from '@ui/registry/tailwind/ui/code-block';

const code = `{
  "location": "Amsterdam",
  "temperature": 14,
  "unit": "celsius",
  "conditions": ["cloudy", "wind"]
}`;

const { lines } = useHighlightedCode(code, 'json');
</script>

<template>
  <CodeBlock size="sm">
    <CodeBlockHeader>
      <CodeBlockTitle>
        <WrenchIcon />
        getWeather output
      </CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent
      :code="code"
      :lines="lines"
      language="json"
    />
  </CodeBlock>
</template>
