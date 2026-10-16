<script setup lang="ts">
import { computed, ref } from 'vue';
import { useClipboard } from '@vueuse/core';
import { template } from 'lodash-es';
import { Button } from '@ui/registry/tailwind/ui/button';
import { CheckIcon, CopyIcon } from 'lucide-vue-next';
import { TAILWIND_STYLES_WITH_VARS_TEMPLATE } from '@sigma-ui/shared/templates/tailwind-styles';
import { CSS_STYLES_WITH_VARS_TEMPLATE } from '@sigma-ui/shared/templates/css-styles';
import { useConfigStore } from '@/stores/config';
import { themes } from '@sigma-ui/shared/themes';

const { config } = useConfigStore();

const activeTheme = computed(() => themes.find(i => i.name === config.value.theme));

const { copy, copied } = useClipboard();

const codeRef = ref<HTMLElement>();
const code = computed(() => {
  const selectedTemplate = config.value.styleSystem === 'tailwind' ? TAILWIND_STYLES_WITH_VARS_TEMPLATE : CSS_STYLES_WITH_VARS_TEMPLATE;

  return template(selectedTemplate)({
    colors: activeTheme.value?.cssVars,
    sizes: {
      radius: config.value.radius,
      backdropFilterBlur: config.value.backdropFilterBlur,
    },
  });
});

async function copyCode() {
  await copy(codeRef.value?.textContent?.replace(/\u00A0/g, ' ') ?? '');
}
</script>

<template>
  <div class="relative grid overflow-x-auto">
    <div class="grid overflow-x-auto">
      <pre
        ref="codeRef"
        class="h-[450px] overflow-auto rounded-lg border bg-gray-950 p-4 text-xs text-gray-100 dark:bg-gray-900"
      ><code>{{ code }}</code></pre>
    </div>
    <Button
      size="sm"
      class="absolute right-4 top-4 bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground"
      @click="copyCode"
    >
      <CheckIcon
        v-if="copied"
        class="mr-2 h-4 w-4"
      />
      <CopyIcon
        v-else
        class="mr-2 h-4 w-4"
      />
      {{ copied ? 'Copied' : 'Copy' }}
    </Button>
  </div>
</template>
