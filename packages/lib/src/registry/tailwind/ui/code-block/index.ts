import { type VariantProps, cva } from 'class-variance-authority';

export { default as CodeBlock } from './CodeBlock.vue';
export { default as CodeBlockActions } from './CodeBlockActions.vue';
export { default as CodeBlockContent } from './CodeBlockContent.vue';
export { default as CodeBlockCopyButton } from './CodeBlockCopyButton.vue';
export { default as CodeBlockExpandButton } from './CodeBlockExpandButton.vue';
export { default as CodeBlockFooter } from './CodeBlockFooter.vue';
export { default as CodeBlockHeader } from './CodeBlockHeader.vue';
export { default as CodeBlockLine } from './CodeBlockLine.vue';
export { default as CodeBlockTabs } from './CodeBlockTabs.vue';
export { default as CodeBlockTabsContent } from './CodeBlockTabsContent.vue';
export { default as CodeBlockTabsList } from './CodeBlockTabsList.vue';
export { default as CodeBlockTabsTrigger } from './CodeBlockTabsTrigger.vue';
export { default as CodeBlockTitle } from './CodeBlockTitle.vue';
export { default as CodeBlockWrapButton } from './CodeBlockWrapButton.vue';
export {
  type CodeBlockHighlightOptions,
  type CodeBlockThemes,
  codeBlockLanguageAliases,
  codeBlockLanguages,
  highlightCode,
  loadCodeBlockHighlighter,
  resolveCodeBlockLanguage,
} from '@ui/registry/shared/ui/code-block/highlighter';
export {
  type CodeBlockLineVariant,
  type CodeToken,
  type LineSelector,
  type PrepareCodeOptions,
  type WordMatcher,
  prepareCode,
} from '@ui/registry/shared/ui/code-block/lines';
export {
  type UseHighlightedCodeOptions,
  type UseHighlightedCodeReturn,
  useHighlightedCode,
} from '@ui/registry/shared/ui/code-block/use-highlighted-code';

export const codeBlockVariants = cva('relative flex w-full min-w-0 flex-col overflow-hidden rounded-(--radius) border border-(--code-block-border) bg-(--code-block-background) text-sm text-(color:--code-block-foreground) has-[[data-slot=code-block-content]:focus-visible]:border-ring has-[[data-slot=code-block-content]:focus-visible]:ring-[3px] has-[[data-slot=code-block-content]:focus-visible]:ring-ring/35', {
  variants: {
    variant: {
      default: '',
      destructive: 'border-[color-mix(in_oklch,var(--destructive)_45%,var(--border))] bg-[color-mix(in_oklch,var(--destructive)_5%,var(--code-block-background))]',
    },
    size: {
      default: '',
      sm: 'text-xs',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export type CodeBlockVariants = VariantProps<typeof codeBlockVariants>;
