<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';
import { highlightLines, type HighlightedLines, type HighlightLanguage } from '../utils/highlight';

const props = withDefaults(defineProps<{
  code: string;
  language: HighlightLanguage;
  /** Pin a copy button to the frame. Turn off when the host already offers one. */
  copyable?: boolean;
  /** File name header. */
  title?: string;
}>(), {
  copyable: true,
  title: undefined,
});

const { copy, copied } = useClipboard({ copiedDuring: 1600 });
const highlighted = ref<HighlightedLines>();
let requestId = 0;

function plainLines(code: string): HighlightedLines {
  return code.split('\n').map(line => [{ content: line, offset: 0 }]);
}

async function highlight() {
  const currentRequest = ++requestId;

  try {
    const lines = await highlightLines(props.code, props.language);

    if (currentRequest === requestId) {
      highlighted.value = lines;
    }
  } catch {
    // Grammars are an enhancement: keep the plain text when they cannot load.
    highlighted.value = undefined;
  }
}

// Highlighting needs the browser: the first render (SSR included) shows plain, selectable text.
onMounted(() => {
  highlight();
  watch(() => [props.code, props.language], highlight);
});
</script>

<template>
  <div
    :class="[
      `language-${language}`,
      'vp-adaptive-theme',
      { 'has-title': title, 'no-copy': !copyable },
    ]"
  >
    <div
      v-if="title"
      class="code-title"
    >
      {{ title }}
    </div>
    <button
      v-if="copyable"
      type="button"
      class="copy"
      :class="{ copied }"
      :aria-label="copied ? 'Copied' : 'Copy code'"
      :title="copied ? 'Copied' : 'Copy code'"
      @click="copy(code)"
    />
    <pre class="shiki"><code><template
      v-for="(line, lineIndex) in highlighted ?? plainLines(code)"
      :key="lineIndex"
    ><span class="line"><span
      v-for="(token, tokenIndex) in line"
      :key="tokenIndex"
      :style="token.htmlStyle"
    >{{ token.content }}</span></span>{{ '\n' }}</template></code></pre>
  </div>
</template>
