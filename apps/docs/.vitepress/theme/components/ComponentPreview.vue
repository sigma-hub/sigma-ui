<script setup lang="ts">
import { ref, watch } from 'vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/registry/tailwind/ui/tabs';
import { cn } from '@ui/utils';
import { useActiveStyleSystem } from '../composables/useActiveStyleSystem';
import { useCodePathRewrite } from '../composables/useCodePathRewrite';
import ComponentLoader from './ComponentLoader.vue';
import Stackblitz from './Stackblitz.vue';
import CodeSandbox from './CodeSandbox.vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  name: string;
  align?: 'center' | 'start' | 'end';
  size?: 'unset' | 'md' | 'lg';
}>(), { align: 'center', size: 'md' });

const styleSystem = useActiveStyleSystem();
const rawString = ref('');
const codeContainer = ref<HTMLElement>();

useCodePathRewrite(codeContainer);

watch(styleSystem, async () => {
  try {
    rawString.value = await import(`@ui/registry/${styleSystem.value}/example/${props.name}.vue?raw`).then(res => res.default.trim());
  } catch (error) {
    console.error(error);
  }
}, { immediate: true });
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
          ref="codeContainer"
          class="component-preview-code"
        >
          <slot :name="`code-${styleSystem}`" />
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>

<style scoped>
.component-preview-code :deep(div[class*='language-']) {
  margin: 0;
}
</style>
