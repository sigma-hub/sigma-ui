import type { Ref } from 'vue';
import { createContext } from 'reka-ui';

export type CodeBlockVariant = 'default' | 'destructive';
export type CodeBlockSize = 'default' | 'sm';

export interface CodeBlockContext {
  /** Whether long lines wrap. */
  wrap: Ref<boolean>;
  /** Whether a collapsed block shows all of its lines. */
  expanded: Ref<boolean>;
  /** The text the copy button copies, set by the mounted `CodeBlockContent`. */
  copyValue: Ref<string | undefined>;
  /** Whether the mounted content is taller than its `collapsedHeight`. */
  collapsible: Ref<boolean>;
  /** Id of the mounted content, for `aria-controls`. */
  contentId: Ref<string | undefined>;
  /** Id of the title, for `aria-labelledby`. */
  titleId: Ref<string | undefined>;
  setWrap: (value: boolean) => void;
  setExpanded: (value: boolean) => void;
}

export const [injectCodeBlockContext, provideCodeBlockContext] = createContext<CodeBlockContext>('CodeBlock');

/** Reads the CodeBlock context, or `null` outside a `CodeBlock`. */
export function useCodeBlockContext(): CodeBlockContext | null {
  return injectCodeBlockContext(null);
}

/** Formats a number or a CSS length for a style property. */
export function toCssLength(value: string | number | undefined): string | undefined {
  if (value === undefined || value === '') {
    return undefined;
  }

  return typeof value === 'number' ? `${value}px` : value;
}
