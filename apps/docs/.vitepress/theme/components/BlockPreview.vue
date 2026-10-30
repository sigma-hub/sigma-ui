<script setup lang="ts">
import { InfoIcon, MonitorIcon, SmartphoneIcon, TabletIcon } from '@lucide/vue';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { DEFAULT_COMPONENTS, DEFAULT_UTILS } from '@sigma-ui/shared/consts';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/tailwind/ui/popover';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@ui/registry/tailwind/ui/resizable';
import { Separator } from '@ui/registry/tailwind/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/registry/tailwind/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@ui/registry/tailwind/ui/toggle-group';
import { buildBlockFrameSrc } from '../../block-renderer/frame';
import { languageForFile } from '../utils/highlight';
import { getBlockFileTree, getBlockMainFile, getBlockMeta, type BlockFileNode } from '../utils/blocks';
import BlockCopyButton from './BlockCopyButton.vue';
import HighlightedCode from './HighlightedCode.vue';
import PackageManagerCommand from './PackageManagerCommand.vue';
import Spinner from './Spinner.vue';
import { useConfigStore } from '@/stores/config';

const props = defineProps<{
  name: string;
}>();

interface RegistrySourceFile {
  path: string;
  content?: string;
}

interface RegistryBlockItem {
  registryDependencies?: string[];
  dependencies?: string[];
  files?: Array<RegistrySourceFile | string>;
}

const { config, codeConfig } = useConfigStore();

const isLoading = ref(true);
const tabValue = ref('preview');
const resizableRef = ref<InstanceType<typeof ResizablePanel>>();
const selectedPath = ref('');
const registryItem = ref<RegistryBlockItem>();
const blockMeta = computed(() => getBlockMeta(props.name));
const frameSrc = computed(() => buildBlockFrameSrc({
  name: props.name,
  styleSystem: config.value.styleSystem,
  containerClass: blockMeta.value?.meta.containerClass ?? '',
}));

function sourcePath(file: RegistrySourceFile | string) {
  return typeof file === 'string' ? file : file.path;
}

function sourceContent(file: RegistrySourceFile | string) {
  return typeof file === 'string' ? '' : (file.content ?? '');
}

const registryFiles = computed(() => registryItem.value?.files ?? []);
const blockEntry = computed(() => ({
  registryDependencies: registryItem.value?.registryDependencies ?? [],
  dependencies: registryItem.value?.dependencies ?? [],
  files: registryFiles.value.map(sourcePath),
}));
const fileTree = computed(() => getBlockFileTree(props.name, blockEntry.value.files));
const selectedFile = computed(() => registryFiles.value.find((file) => {
  const blockPrefix = `blocks/${props.name}/`;
  const path = sourcePath(file);
  const relativePath = path.startsWith(blockPrefix) ? path.slice(blockPrefix.length) : path;

  return relativePath === selectedPath.value;
}));

let activeRegistryRequest = 0;
let registryAbortController: AbortController | undefined;

async function loadRegistryItem() {
  if (typeof window === 'undefined') {
    return;
  }

  const requestId = ++activeRegistryRequest;
  registryAbortController?.abort();

  const abortController = new AbortController();
  registryAbortController = abortController;
  const styleSystem = config.value.styleSystem;
  const blockName = props.name;
  registryItem.value = undefined;

  try {
    const response = await fetch(`/r/${styleSystem}/${blockName}.json`, { signal: abortController.signal });
    const item = response.ok ? await response.json() as RegistryBlockItem : undefined;

    if (requestId !== activeRegistryRequest || abortController.signal.aborted) {
      return;
    }

    registryItem.value = item;
  } catch {
    if (requestId !== activeRegistryRequest || abortController.signal.aborted) {
      return;
    }

    registryItem.value = undefined;
  }
}

onMounted(() => {
  loadRegistryItem();
});

onUnmounted(() => {
  activeRegistryRequest += 1;
  registryAbortController?.abort();
});

watch(() => [config.value.styleSystem, props.name], () => {
  loadRegistryItem();
});
const requirements = computed(() => ({
  components: (blockEntry.value?.registryDependencies ?? []).filter(dependency => dependency !== 'utils'),
  packages: (blockEntry.value?.dependencies ?? []).map(stripVersion),
}));

function stripVersion(dependency: string) {
  const versionAt = dependency.startsWith('@') ? dependency.indexOf('@', 1) : dependency.indexOf('@');
  return versionAt === -1 ? dependency : dependency.slice(0, versionAt);
}

function selectFile(node: BlockFileNode) {
  if (node.path) {
    selectedPath.value = node.path;
  }
}

function rewriteSourcePaths(source: string) {
  return source
    .replaceAll(DEFAULT_COMPONENTS, codeConfig.value.componentsPath)
    .replaceAll(DEFAULT_UTILS, codeConfig.value.utilsPath);
}

const rawString = computed(() => rewriteSourcePaths(selectedFile.value ? sourceContent(selectedFile.value) : ''));

watch(frameSrc, () => {
  isLoading.value = true;
});

watch(fileTree, (nodes) => {
  const selectablePaths = nodes.flatMap(node => node.path ? [node.path] : []);
  const mainFile = selectablePaths.find(filePath => filePath.endsWith(getBlockMainFile(props.name)));

  if (!selectedPath.value || !selectablePaths.includes(selectedPath.value)) {
    selectedPath.value = mainFile ?? selectablePaths[0] ?? '';
  }
}, { immediate: true });

</script>

<template>
  <Tabs
    :id="name"
    v-model="tabValue"
    class="relative grid w-full scroll-m-20 gap-4"
    :style=" {
      '--container-height': blockMeta?.meta.iframeHeight ?? '600px',
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
                  {{ blockMeta?.description }}
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
    <p
      v-if="requirements.components.length || requirements.packages.length"
      class="text-sm text-muted-foreground"
    >
      Requires:
      <template
        v-for="(component, index) in requirements.components"
        :key="component"
      >
        <a
          :href="`/components/${component}`"
          class="font-mono text-foreground underline underline-offset-4"
        >{{ component }}</a><span v-if="index < requirements.components.length - 1">, </span>
      </template>
      <template v-if="requirements.packages.length">
        <span v-if="requirements.components.length"> · </span>
        <span
          v-for="(packageName, index) in requirements.packages"
          :key="packageName"
          class="font-mono"
        >{{ packageName }}<span v-if="index < requirements.packages.length - 1">, </span></span>
      </template>
    </p>
    <PackageManagerCommand :run="`sigma-ui@latest add ${name}`" />
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
            :src="frameSrc"
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
      <div class="flex h-full overflow-hidden rounded-lg border">
        <div class="w-56 shrink-0 overflow-auto border-r bg-muted/30 py-2">
          <button
            v-for="node in fileTree"
            :key="`${node.depth}-${node.path ?? node.name}`"
            type="button"
            class="block w-full truncate py-1 pr-2 text-left font-mono text-xs"
            :class="node.path === selectedPath ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'"
            :style="{ paddingLeft: `${node.depth * 12 + 8}px` }"
            :disabled="!node.path"
            @click="selectFile(node)"
          >
            {{ node.name }}
          </button>
        </div>
        <HighlightedCode
          class="block-source-code min-w-0 flex-1"
          :code="rawString"
          :language="languageForFile(selectedPath)"
          :copyable="false"
        />
      </div>
    </TabsContent>
  </Tabs>
</template>
