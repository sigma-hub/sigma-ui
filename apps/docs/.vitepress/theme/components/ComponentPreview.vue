<script setup lang="ts">
import { computed } from 'vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/registry/tailwind/ui/tabs';
import { cn } from '@ui/utils';
import { useActiveStyleSystem } from '../composables/useActiveStyleSystem';
import { useCodePathRewrite } from '../composables/useCodePathRewrite';
import ComponentLoader from './ComponentLoader.vue';
import Stackblitz from './Stackblitz.vue';
import CodeSandbox from './CodeSandbox.vue';
import type { StyleSystem } from '@sigma-ui/shared/style-systems';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  name: string;
  align?: 'center' | 'start' | 'end';
  size?: 'unset' | 'md' | 'lg';
  code?: Partial<Record<StyleSystem, string>>;
  codeHtml?: Partial<Record<StyleSystem, string>>;
}>(), {
  align: 'center',
  size: 'md',
  code: () => ({}),
  codeHtml: () => ({}),
});

const styleSystem = useActiveStyleSystem();
const rewriteCodePaths = useCodePathRewrite();
const rawString = computed(() => props.code?.[styleSystem.value] ?? '');
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
              :key="styleSystem"
              :style-system="styleSystem"
              :name="name"
              :code="rawString"
            />
            <CodeSandbox
              :key="styleSystem"
              :style-system="styleSystem"
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
            :key="styleSystem"
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
          v-if="codeHtml[styleSystem]"
          class="component-preview-code"
          v-html="rewriteCodePaths(codeHtml[styleSystem] ?? '')"
        />
      </TabsContent>
    </Tabs>
  </div>
</template>

<style scoped>
.component-preview-code :deep(div[class*='language-']) {
  margin: 0;
}
</style>
