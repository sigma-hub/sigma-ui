<script setup lang="ts">
import { useStorage } from '@vueuse/core';
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
  useHighlightedCode,
} from '@ui/registry/css/ui/code-block';

const commands = {
  pnpm: 'pnpm dlx sigma-ui@latest add code-block',
  npm: 'npx sigma-ui@latest add code-block',
  yarn: 'yarn dlx sigma-ui@latest add code-block',
  bun: 'bunx --bun sigma-ui@latest add code-block',
};

type PackageManager = keyof typeof commands;

const packageManagers = Object.keys(commands) as PackageManager[];
const packageManager = useStorage<PackageManager>('code-block-package-manager', 'pnpm');
const highlighted = Object.fromEntries(packageManagers.map(name => [name, useHighlightedCode(commands[name], 'bash').lines]));
</script>

<template>
  <CodeBlock>
    <CodeBlockTabs v-model="packageManager">
      <CodeBlockHeader>
        <CodeBlockTabsList aria-label="Package manager">
          <CodeBlockTabsTrigger
            v-for="name in packageManagers"
            :key="name"
            :value="name"
          >
            {{ name }}
          </CodeBlockTabsTrigger>
        </CodeBlockTabsList>
        <CodeBlockActions>
          <CodeBlockCopyButton />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockTabsContent
        v-for="name in packageManagers"
        :key="name"
        :value="name"
      >
        <CodeBlockContent
          :code="commands[name]"
          :lines="highlighted[name].value"
          language="bash"
        />
      </CodeBlockTabsContent>
    </CodeBlockTabs>
  </CodeBlock>
</template>
