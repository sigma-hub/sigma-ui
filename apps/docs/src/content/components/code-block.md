---
title: Code Block
description: Shows code with syntax highlighting, line numbers, diffs, tabs, and a copy button.
source: code-block
label: New
---

## Preview

<ComponentPreview name="CodeBlock" size="lg" />

## Installation

<ComponentInstall name="code-block" />

The install adds [shiki](https://shiki.style). Highlighting loads in the browser on first use, and each language is a separate chunk. A page with no highlighted block loads no shiki code.

## Usage

`CodeBlockContent` renders the code. Pass `code` and the block shows it as plain text. To highlight it, pass the same code to `useHighlightedCode` and its `lines` to `CodeBlockContent`. The block shows plain text until the tokens arrive.

```vue
<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
  useHighlightedCode,
} from '@/components/ui/code-block';

const code = `export function sum(a: number, b: number) {
  return a + b;
}`;

const { lines } = useHighlightedCode(code, 'ts');
</script>

<template>
  <CodeBlock>
    <CodeBlockHeader>
      <CodeBlockTitle>math.ts</CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent
      :code="code"
      :lines="lines"
      language="ts"
      line-numbers
    />
  </CodeBlock>
</template>
```

`CodeBlockCopyButton` copies the code of the `CodeBlockContent` next to it. Use `value` to copy something else. `CodeBlockWrapButton` and `CodeBlockExpandButton` also control the block they sit in.

### Line numbers and highlighted lines

`highlightLines`, `focusLines`, `addedLines`, and `removedLines` take `"1,4-6"` or an array of numbers. They count the lines of `code` from 1, whatever `startLine` is. `startLine` only changes the numbers in the gutter. To highlight what is shown as line 97 with `start-line="96"`, pass `highlight-lines="2"`.

When a line matches more than one prop, removed wins over added, and added wins over highlighted.

### Diffs

Set `diff` and write the code as a diff: a leading `+` marks an added line, `-` a removed line, and a space an unchanged line. The markers are hidden and shown in the gutter instead. `+++` and `---` file headers are left as they are. The copy button copies the code after the change, without the removed lines.

Pass `diff` to `useHighlightedCode` too, so the tokens match the lines.

### Notation comments

Set `notation` to read [shiki notation comments](https://shiki.style/packages/transformers#transformernotationhighlight) at the end of a line. The comments are hidden. Pass `notation` to `useHighlightedCode` too.

| Comment | Effect |
| --- | --- |
| `// [!code highlight]` or `// [!code hl]` | Highlights the line. |
| `// [!code focus]` | Focuses the line and dims the others. |
| `// [!code ++]` and `// [!code --]` | Marks the line as added or removed. |
| `// [!code word:name]` | Marks `name` on the line. On a line of its own, it marks `name` on every line after it. |

Add `:N` to apply a comment to N lines, as in `// [!code highlight:3]` or `// [!code word:name:2]`. Use the comment syntax of the language: `#`, `--`, `<!-- -->`, and `/* */` work too.

### Languages

These languages are included: `bash`, `css`, `diff`, `html`, `javascript`, `json`, `jsx`, `markdown`, `python`, `sql`, `tsx`, `typescript`, `vue`, `yaml`, and `ansi`. Aliases such as `ts`, `js`, `sh`, `shell`, `console`, `md`, `py`, and `yml` work too. Any other language shows as plain text.

To add one, add it to `codeBlockLanguages` in `highlighter.ts`:

```ts
export const codeBlockLanguages: Record<string, LanguageInput> = {
  // ...
  rust: () => import('shiki/langs/rust.mjs'),
};
```

The shiki core and the JavaScript regex engine are about 55 KB gzipped. Each language adds its own chunk the first time it is used: TypeScript is about 16 KB and Vue about 60 KB, because it includes the languages it embeds.

### Theming

The default theme uses CSS variables, so the colors follow your theme and dark mode. Override them on `[data-slot='code-block']`, and for dark mode on `.dark [data-slot='code-block']`.

| Variable | Used for |
| --- | --- |
| `--code-block-background`, `--code-block-foreground` | The block and its text. |
| `--code-block-header`, `--code-block-border` | The header and the borders. |
| `--code-block-line-number` | Line numbers. |
| `--code-block-token-*` | Token colors: `keyword`, `string`, `constant`, `function`, `parameter`, `comment`, `punctuation`, `link`. |
| `--code-block-ansi-*` | ANSI colors, such as `red`, `green`, and `bright-black`. |
| `--code-block-highlighted`, `--code-block-highlighted-border` | Highlighted lines. |
| `--code-block-added`, `--code-block-added-border`, `--code-block-added-marker` | Added lines. |
| `--code-block-removed`, `--code-block-removed-border`, `--code-block-removed-marker` | Removed lines. |
| `--code-block-word`, `--code-block-word-border` | Marked words. |
| `--code-block-destructive-foreground` | Text in the `destructive` variant. |

To use shiki themes instead, pass a light and a dark theme to `useHighlightedCode`. The `.dark` class picks between them. The block keeps its own background, so check that the theme colors are readable on it.

```ts
const { lines } = useHighlightedCode(code, 'ts', {
  themes: {
    light: () => import('shiki/themes/github-light.mjs'),
    dark: () => import('shiki/themes/github-dark.mjs'),
  },
});
```

### Server rendering

`useHighlightedCode` does nothing on the server, so the server and the first client render show the same plain text. To send highlighted HTML from the server, call `highlightCode` while rendering, for example in Nuxt's `useAsyncData`, and pass the result as `initial`. The result is plain JSON.

```ts
const { data: initial } = await useAsyncData('example', () => highlightCode(code, 'ts'));
const { lines } = useHighlightedCode(code, 'ts', { initial: initial.value });
```

## Examples

### Header with a file name

<ComponentPreview name="CodeBlockHeader" />

### Plain text

Without `lines`, the code renders as plain text.

<ComponentPreview name="CodeBlockBasic" />

### Line numbers

<ComponentPreview name="CodeBlockLineNumbers" size="lg" />

### Start line

`startLine` changes the first number. `highlightLines` still counts from the first line of `code`.

<ComponentPreview name="CodeBlockStartLine" />

### Highlighted lines

<ComponentPreview name="CodeBlockHighlightLines" />

### Highlighted words

`highlightWords` takes strings and regular expressions.

<ComponentPreview name="CodeBlockHighlightWords" />

### Focus

Lines outside `focusLines` are dimmed until the pointer is over the block or focus is inside it.

<ComponentPreview name="CodeBlockFocus" />

### Diff

<ComponentPreview name="CodeBlockDiff" />

### Notation comments

<ComponentPreview name="CodeBlockNotation" />

### Wrapping

`CodeBlockWrapButton` toggles wrapping. Use `v-model:wrap` on `CodeBlock` to set it yourself.

<ComponentPreview name="CodeBlockWrap" />

### Maximum height

`maxHeight` caps the height. The content scrolls inside and can be scrolled with the keyboard.

<ComponentPreview name="CodeBlockMaxHeight" />

### Expand

With `collapsedHeight`, the block starts short. `CodeBlockExpandButton` shows the rest, and it only renders when the code is taller than `collapsedHeight`.

<ComponentPreview name="CodeBlockExpand" size="lg" />

### Files in tabs

`CodeBlockTabs` puts several files in one block. The actions in the header apply to the active tab.

<ComponentPreview name="CodeBlockTabs" />

### Package managers

The choice is saved with `useStorage`, so it is the same in every block and after a reload.

<ComponentPreview name="CodeBlockPackageManagers" />

### Terminal output

The `ansi` language reads ANSI color codes, so terminal output keeps its colors.

<ComponentPreview name="CodeBlockAnsi" />

### Streaming

While `code` grows, only the new lines are highlighted again. Disable the copy button until the code is complete.

<ComponentPreview name="CodeBlockStreaming" size="lg" />

### Actions without a header

Put `CodeBlockActions` directly in `CodeBlock` and the actions float in the top corner. They show on hover and on focus, and always on touch screens.

<ComponentPreview name="CodeBlockFloatingActions" />

### Small

`size="sm"` is for tool output and logs.

<ComponentPreview name="CodeBlockSize" />

### Destructive

<ComponentPreview name="CodeBlockDestructive" />

### Shiki themes

<ComponentPreview name="CodeBlockThemes" />

### Custom lines

Put `CodeBlockLine` elements in `CodeBlockContent` to build the lines yourself. `code` is then only what the copy button copies.

<ComponentPreview name="CodeBlockLines" />

## API Reference

<!-- @include: @/content/meta/code-block.md -->

## Accessibility

- The code is a `pre` element with `dir="ltr"`, so it reads left to right in right-to-left pages. A `CodeBlockTitle` names it through `aria-labelledby`.
- When the code scrolls, the content becomes focusable, so it can be scrolled with the arrow keys. A focus ring shows on the block.
- Line numbers and diff markers are CSS, so screen readers skip them and they are not copied. Added and removed lines start with hidden "Added:" and "Removed:" labels. Change them with `addedLabel` and `removedLabel`.
- The copy button announces "Copied", or "Copy failed", in a live region. The wrap button is a toggle with `aria-pressed`, and the expand button sets `aria-expanded` and `aria-controls`.
- Floating actions are always visible on touch screens. Focus dimming and the expand icon turn off their transitions when reduced motion is requested.
- In forced colors mode, highlighted, added, and removed lines get an outline instead of a background.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the tabs, the action buttons, and the content when it scrolls. |
| <kbd>ArrowLeft</kbd> or <kbd>ArrowRight</kbd> | Moves between tabs and selects them. |
| <kbd>Home</kbd> or <kbd>End</kbd> | Moves to the first or last tab. |
| <kbd>ArrowUp</kbd> or <kbd>ArrowDown</kbd> | Scrolls the focused content. |
