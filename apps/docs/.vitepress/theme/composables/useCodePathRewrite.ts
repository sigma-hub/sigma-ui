import { useMounted } from '@vueuse/core';
import { DEFAULT_COMPONENTS, DEFAULT_UTILS } from '@sigma-ui/shared/consts';
import { useConfigStore } from '@/stores/config';

function escapeHtml(text: string) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function useCodePathRewrite() {
  const { codeConfig } = useConfigStore();
  const isMounted = useMounted();

  return function rewriteCodePaths(html: string) {
    if (!isMounted.value) {
      return html;
    }

    return html
      .replaceAll(DEFAULT_COMPONENTS, escapeHtml(codeConfig.value.componentsPath))
      .replaceAll(DEFAULT_UTILS, escapeHtml(codeConfig.value.utilsPath));
  };
}
