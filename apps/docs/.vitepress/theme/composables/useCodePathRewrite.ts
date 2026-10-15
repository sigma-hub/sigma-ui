import { type Ref, onMounted, watch } from 'vue';
import { DEFAULT_COMPONENTS, DEFAULT_UTILS } from '~/packages/shared/consts';
import { useConfigStore } from '@/stores/config';

interface CodePaths {
  componentsPath: string;
  utilsPath: string;
}

const originalTexts = new WeakMap<Text, string>();

export function rewriteCodePaths(code: string, paths: CodePaths) {
  return code
    .replaceAll(DEFAULT_COMPONENTS, paths.componentsPath)
    .replaceAll(DEFAULT_UTILS, paths.utilsPath);
}

export function useCodePathRewrite(container: Ref<HTMLElement | undefined>) {
  const { codeConfig } = useConfigStore();

  function rewriteTextNodes() {
    if (!container.value) {
      return;
    }

    const walker = document.createTreeWalker(container.value, NodeFilter.SHOW_TEXT);

    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const textNode = node as Text;
      const originalText = originalTexts.get(textNode) ?? textNode.data;

      if (!originalText.includes(DEFAULT_COMPONENTS) && !originalText.includes(DEFAULT_UTILS)) {
        continue;
      }

      originalTexts.set(textNode, originalText);
      textNode.data = rewriteCodePaths(originalText, codeConfig.value);
    }
  }

  onMounted(rewriteTextNodes);
  watch([codeConfig, container], rewriteTextNodes, { deep: true, flush: 'post' });
}
