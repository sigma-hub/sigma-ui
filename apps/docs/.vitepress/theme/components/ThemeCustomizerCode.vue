<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useClipboard } from '@vueuse/core';
import { template } from 'lodash-es';
import { codeToHtml } from 'shiki';
import { Button } from '@ui/registry/tailwind/ui/button';
import { CheckIcon, CopyIcon } from 'lucide-vue-next';
import { TAILWIND_STYLES_WITH_VARS_TEMPLATE } from '~/packages/shared/templates/tailwind-styles';
import { CSS_STYLES_WITH_VARS_TEMPLATE } from '~/packages/shared/templates/css-styles';
import { useConfigStore } from '@/stores/config';
import { themes } from '@/lib/registry';

const { config } = useConfigStore();

const activeTheme = computed(() => themes.find(i => i.name === config.value.theme));

const { copy, copied } = useClipboard();

const codeRef = ref<HTMLElement>();
const code = ref<string>();

watch(activeTheme, () => {
  getCodeTemplate().then((res) => {
    code.value = res;
  });
}, { immediate: true });

async function copyCode() {
  await copy(codeRef.value?.textContent?.replace(/\u00A0/g, ' ') ?? '');
}

async function getCodeTemplate() {
  const selectedTemplate = config.value.styleSystem === 'tailwind' ? TAILWIND_STYLES_WITH_VARS_TEMPLATE : CSS_STYLES_WITH_VARS_TEMPLATE;

  return await codeToHtml(
    template(selectedTemplate)({
      colors: activeTheme.value?.cssVars,
      sizes: {
        radius: config.value.radius,
      },
    }),
    {
      lang: 'css',
      theme: 'one-dark-pro',
    },
  );
}
</script>

<template>
  <div class="relative grid overflow-x-auto">
    <div class="grid overflow-x-auto">
      <div
        ref="codeRef"
        class="h-[450px] rounded-lg border bg-zinc-950 !py-0 dark:bg-zinc-900"
        v-html="code"
      />
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
