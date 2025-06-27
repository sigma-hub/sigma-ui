<script setup lang="ts">
import { InfoIcon, MonitorIcon, SmartphoneIcon, TabletIcon } from 'lucide-vue-next';
import { reactive, ref, watch } from 'vue';
import { codeToHtml } from 'shiki';
import { compileScript, parse, walk } from 'vue/compiler-sfc';
import MagicString from 'magic-string';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/tailwind/ui/popover';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@ui/registry/tailwind/ui/resizable';
import { Separator } from '@ui/registry/tailwind/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/registry/tailwind/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@ui/registry/tailwind/ui/toggle-group';
import { cssVariables } from '../config/shiki';
import BlockCopyButton from './BlockCopyButton.vue';
import Spinner from './Spinner.vue';
import { useConfigStore } from '@/stores/config';

const props = defineProps<{
  name: string;
  blockDir: string;
}>();

const { config, codeConfig } = useConfigStore();

const isLoading = ref(true);
const tabValue = ref('preview');
const resizableRef = ref<InstanceType<typeof ResizablePanel>>();
const rawString = ref('');
const codeHtml = ref('');
const metadata = reactive({
  description: null as string | null,
  iframeHeight: null as string | null,
  containerClass: null as string | null,
});

function removeScript(code: string) {
  const s = new MagicString(code);
  const scriptTagRegex = /<script\s+lang="ts"\s*>[\s\S]+?<\/script>/g;
  let match;

  while ((match = scriptTagRegex.exec(code)) !== null) {
    const start = match.index;
    const end = match.index + match[0].length;
    s.overwrite(start, end, '');
  }

  return s.trimStart().toString();
}

function transformImportPath(code: string) {
  const s = new MagicString(code);
  s.replaceAll(`@ui/registry/${config.value.styleSystem}/ui`, codeConfig.value.componentsPath);
  s.replaceAll(`@ui/utils`, codeConfig.value.utilsPath);
  return s.toString();
}

watch([() => config.value.styleSystem, codeConfig], async () => {
  try {
    const baseRawString = await import(`@ui/registry/${config.value.styleSystem}/block/${props.blockDir}/${props.name}.vue?raw`)
      .then(res => res.default.trim());
    rawString.value = transformImportPath(removeScript(baseRawString));

    if (!metadata.description) {
      const { descriptor } = parse(baseRawString);
      const ast = compileScript(descriptor, { id: '' });
      walk(ast.scriptAst, {
        enter(node: any) {
          const declaration = node.declaration;

          if (declaration?.type === 'VariableDeclaration') {
            // Extract variable names and their values
            declaration.declarations.forEach((decl: any) => {
              // @ts-expect-error ignore missing type
              metadata[decl.id.name] = decl.init ? decl.init.value : null;
            });
          }
        },
      });
    }

    codeHtml.value = await codeToHtml(rawString.value, {
      lang: 'vue',
      theme: cssVariables,
    });
  } catch (err) {
    console.error(err);
  }
}, { immediate: true, deep: true });
</script>

<template>
  <Tabs
    :id="name"
    v-model="tabValue"
    class="relative grid w-full scroll-m-20 gap-4"
    :style=" {
      '--container-height': metadata.iframeHeight ?? '600px',
    }"
  >
    <div class="flex gap-4">
      <div class="flex items-center gap-2">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div class="flex items-center ">
            <TabsList class="flex h-8">
              <TabsTrigger value="preview">
                Preview
              </TabsTrigger>
              <TabsTrigger value="code">
                Code
              </TabsTrigger>
            </TabsList>
            <Separator
              orientation="vertical"
              class="flex mx-2 h-4"
            />
            <BlockCopyButton :code="rawString" />
          </div>
          <div class="flex items-center gap-2">
            <Separator
              orientation="vertical"
              class="hidden sm:flex mx-2 h-4"
            />
            <div class="flex items-center gap-2">
              <a :href="`#${name}`">
                <Badge variant="outline">{{ name }}</Badge>
              </a>
              <Popover>
                <PopoverTrigger class="flex text-muted-foreground hover:text-foreground">
                  <InfoIcon class="h-3.5 w-3.5" />
                  <span class="sr-only">Block description</span>
                </PopoverTrigger>
                <PopoverContent
                  side="right"
                  :side-offset="10"
                  class="text-sm"
                >
                  {{ metadata.description }}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden items-center gap-2 pr-[14px] ml-auto sm:flex">
        <div class="flex h-[28px] items-center gap-1.5 rounded-md border p-[2px] shadow-sm">
          <ToggleGroup
            type="single"
            default-value="100"
            @update:model-value="(value) => {
              resizableRef?.resize(parseInt(value as string))
            }"
          >
            <ToggleGroupItem
              value="30"
              class="h-[22px] w-[22px] rounded-sm p-0"
            >
              <SmartphoneIcon class="h-3.5 w-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="60"
              class="h-[22px] w-[22px] rounded-sm p-0"
            >
              <TabletIcon class="h-3.5 w-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="100"
              class="h-[22px] w-[22px] rounded-sm p-0"
            >
              <MonitorIcon class="h-3.5 w-3.5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
    <TabsContent
      v-show="tabValue === 'preview'"
      force-mount
      value="preview"
      class="relative after:absolute after:inset-0 after:right-3 after:z-0 after:rounded-lg after:bg-muted h-(--container-height) px-0"
    >
      <ResizablePanelGroup
        id="block-resizable"
        direction="horizontal"
        class="relative z-10"
      >
        <ResizablePanel
          id="block-resizable-panel-1"
          ref="resizableRef"
          class="relative rounded-lg border bg-background transition-all "
          :default-size="100"
          :min-size="30"
        >
          <div
            v-if="isLoading"
            class="flex items-center justify-center h-full"
          >
            <Spinner />
          </div>
          <iframe
            v-show="!isLoading"
            :src="`/blocks/renderer#name=${name}&styleSystem=${config.styleSystem}&blockDir=${props.blockDir}&blockType=${name.split(/(?=[A-Z])/)[0].toLowerCase()}&containerClass=${encodeURIComponent(metadata.containerClass ?? '')}`"
            class="relative z-20 w-full bg-background h-(--container-height)"
            @load="isLoading = false"
          />
        </ResizablePanel>
        <ResizableHandle
          id="block-resizable-handle"
          class="relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:bg-border after:transition-all after:hover:h-10 sm:block"
        />
        <ResizablePanel
          id="block-resizable-panel-2"
          :default-size="0"
          :min-size="0"
        />
      </ResizablePanelGroup>
    </TabsContent>
    <TabsContent
      value="code"
      class="h-(--container-height)"
    >
      <div
        class="language-vue !h-full !max-h-[none] !mt-0"
        v-html="codeHtml"
      />
    </TabsContent>
  </Tabs>
</template>
