<script setup lang="ts">
import { TerminalIcon } from 'lucide-vue-next';
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
  useHighlightedCode,
} from '@ui/registry/tailwind/ui/code-block';

const escape = String.fromCharCode(27);
const color = (code: number, text: string) => `${escape}[${code}m${text}${escape}[39m`;

const output = [
  '$ pnpm test',
  '',
  ` ${color(32, '✓')} src/utils/format.test.ts (6 tests) 4ms`,
  ` ${color(32, '✓')} src/stores/cart.test.ts (9 tests) 11ms`,
  ` ${color(31, '✗')} src/composables/useSearch.test.ts (4 tests | 1 failed) 23ms`,
  `   ${color(31, 'AssertionError: expected [] to have a length of 3')}`,
  '',
  ` Test Files  ${color(31, '1 failed')} | ${color(32, '2 passed')} (3)`,
  `      Tests  ${color(31, '1 failed')} | ${color(32, '18 passed')} (19)`,
  `   Duration  ${color(33, '1.42s')}`,
].join('\n');

const plainOutput = output.replaceAll(new RegExp(`${escape}\\[\\d+m`, 'g'), '');
const { lines } = useHighlightedCode(output, 'ansi');
</script>

<template>
  <CodeBlock size="sm">
    <CodeBlockHeader>
      <CodeBlockTitle>
        <TerminalIcon />
        Terminal
      </CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton :value="plainOutput" />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent
      :code="output"
      :lines="lines"
      language="ansi"
    />
  </CodeBlock>
</template>
