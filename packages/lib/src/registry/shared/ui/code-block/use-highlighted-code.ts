import {
  type MaybeRefOrGetter,
  type Ref,
  type ShallowRef,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  toValue,
  watch,
} from 'vue';
import type { GrammarState } from 'shiki/core';
import { type CodeBlockHighlightOptions, type LoadedCodeBlockHighlighter, loadCodeBlockHighlighter } from './highlighter';
import { type CodeToken, type PrepareCodeOptions, prepareCode } from './lines';

export interface UseHighlightedCodeOptions extends CodeBlockHighlightOptions, PrepareCodeOptions {
  /** Tokens rendered on the server, so hydration matches before the client highlighter loads. */
  initial?: CodeToken[][] | null;
}

export interface UseHighlightedCodeReturn {
  /** One token array per rendered line, or `null` until highlighting finishes or for an unknown language. */
  lines: ShallowRef<CodeToken[][] | null>;
  /** True while the highlighter or the language is loading. */
  loading: Ref<boolean>;
  /** The last loading error, if any. */
  error: ShallowRef<unknown>;
}

interface Progress {
  highlighter: LoadedCodeBlockHighlighter;
  text: string;
  lines: CodeToken[][];
  state?: GrammarState;
}

/**
 * Highlights code with shiki in the browser. Pass `diff` and `notation` with the same
 * values as on `CodeBlockContent`, so the token lines match the rendered lines.
 *
 * While the code grows, as it does when it streams, only the new lines are tokenized.
 */
export function useHighlightedCode(
  code: MaybeRefOrGetter<string | undefined>,
  language: MaybeRefOrGetter<string | undefined>,
  options: MaybeRefOrGetter<UseHighlightedCodeOptions> = {},
): UseHighlightedCodeReturn {
  const lines = shallowRef<CodeToken[][] | null>(toValue(options).initial ?? null);
  const loading = ref(false);
  const error = shallowRef<unknown>();
  let progress: Progress | null = null;
  let request = 0;
  let stopped = false;

  function tokenize(highlighter: LoadedCodeBlockHighlighter, source: string) {
    if (progress?.highlighter !== highlighter || !source.startsWith(progress.text)) {
      progress = { highlighter, text: '', lines: [] };
    }

    // Complete lines are kept; only lines after the last newline are tokenized again.
    const end = source.lastIndexOf('\n') + 1;

    if (end > progress.text.length) {
      const chunk = highlighter.highlight(source.slice(progress.text.length, end - 1), progress.state);
      progress = {
        highlighter,
        text: source.slice(0, end),
        lines: [...progress.lines, ...chunk.lines],
        state: chunk.state,
      };
    }

    const tail = highlighter.highlight(source.slice(end), progress.state).lines[0] ?? [];
    return [...progress.lines, tail];
  }

  async function update() {
    const current = ++request;
    const resolvedOptions = toValue(options);
    const source = prepareCode(toValue(code) ?? '', resolvedOptions).code;

    loading.value = true;

    try {
      const highlighter = await loadCodeBlockHighlighter(toValue(language), resolvedOptions);

      if (stopped || current !== request) {
        return;
      }

      lines.value = highlighter ? tokenize(highlighter, source) : null;
      error.value = undefined;
    } catch (cause) {
      if (current === request) {
        error.value = cause;
        lines.value = null;
      }
    } finally {
      if (current === request) {
        loading.value = false;
      }
    }
  }

  function start() {
    watch(
      () => [toValue(code), toValue(language), toValue(options)] as const,
      () => update(),
      { immediate: true, deep: true },
    );
  }

  // Nothing runs during server rendering, so the server and the first client render match.
  if (getCurrentInstance()) {
    onMounted(start);
    onBeforeUnmount(() => {
      stopped = true;
    });
  } else if (typeof window !== 'undefined') {
    start();
  }

  return { lines, loading, error };
}
