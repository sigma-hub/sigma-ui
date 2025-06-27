<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { codeToHtml } from 'shiki';
import MagicString from 'magic-string';
import { useClipboard } from '@vueuse/core';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/registry/tailwind/ui/tabs';
import { cn } from '@ui/utils';
import { cssVariables } from '../config/shiki';
import ComponentLoader from './ComponentLoader.vue';
import Stackblitz from './Stackblitz.vue';
import CodeSandbox from './CodeSandbox.vue';
import { useConfigStore } from '@/stores/config';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  name: string;
  align?: 'center' | 'start' | 'end';
  size?: 'unset' | 'md' | 'lg';
}>(), { align: 'center', size: 'md' });

const { config, codeConfig } = useConfigStore();

const rawString = ref('');
const codeHtml = ref('');
const transformedRawString = computed(() => transformImportPath(rawString.value));

function transformImportPath(code: string) {
  const s = new MagicString(code);
  s.replaceAll(`@ui/registry/${config.value.styleSystem}/ui`, codeConfig.value.componentsPath);
  s.replaceAll(`@ui/utils`, codeConfig.value.utilsPath);
  return s.toString();
}

watch([() => config.value.styleSystem, codeConfig], async () => {
  try {
    rawString.value = await import(`@ui/registry/${config.value.styleSystem}/example/${props.name}.vue?raw`).then(res => res.default.trim());
    codeHtml.value = await codeToHtml(transformedRawString.value, {
      lang: 'vue',
      theme: cssVariables,
    });
  } catch (err) {
    console.error(err);
  }
}, { immediate: true, deep: true });

const { copy, copied } = useClipboard();
</script>

<template>
  <div
    class="not-docs group relative my-4 flex flex-col space-y-2 rounded-md border"
  >
    <Tabs
      default-value="preview"
      class="relative mr-auto w-full"
    >
      <div class="flex items-center justify-between border-b h-[48px] px-2">
        <div>
          <TabsList class="w-full justify-start h-8">
            <TabsTrigger
              value="preview"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-x-1">
            <Stackblitz
              :key="config.styleSystem"
              :style-system="config.styleSystem"
              :name="name"
              :code="rawString"
            />
            <CodeSandbox
              :key="config.styleSystem"
              :style-system="config.styleSystem"
              :name="name"
              :code="rawString"
            />
          </div>
        </div>
      </div>
      <TabsContent
        value="preview"
        class="relative"
      >
        <div
          :class="cn('preview flex w-full justify-center p-10 items-center', {
            'items-center': align === 'center',
            'items-start': align === 'start',
            'items-end': align === 'end',
            'min-h-[350px]': size === 'md',
            'min-h-[650px]': size === 'lg',
            'min-h-[unset]': size === 'unset',
          })"
        >
          <ComponentLoader
            v-bind="$attrs"
            :key="config.styleSystem"
            :name="name"
            :type-name="'example'"
          />
        </div>
      </TabsContent>
      <TabsContent
        value="code"
        class="vp-doc m-0 p-2"
      >
        <div
          v-if="codeHtml"
          class="language-vue flex-1 !m-0"
        >
          <button
            title="Copy Code"
            class="copy"
            :class="{ copied }"
            @click="copy(transformedRawString)"
          />

          <div v-html="codeHtml" />
        </div>
        <slot v-else />
      </TabsContent>
    </Tabs>
  </div>
</template>
