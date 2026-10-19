<script setup lang="ts">
import { computed } from 'vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/registry/tailwind/ui/tabs';
import type { ComponentDependencies, RenderedSourceFile } from '../plugins/registry-source';
import { useActiveStyleSystem } from '../composables/useActiveStyleSystem';
import PackageManagerCommand from './PackageManagerCommand.vue';
import SourceFile from './SourceFile.vue';
import type { StyleSystem } from '@sigma-ui/shared/style-systems';

const props = defineProps<{
  name: string;
  dependencies?: Record<StyleSystem, ComponentDependencies>;
  files?: Record<StyleSystem, RenderedSourceFile[]>;
}>();

const EMPTY_DEPENDENCIES: ComponentDependencies = { packages: [], components: [], usesUtils: false };
const STEP_CLASS = 'relative list-none [counter-increment:install-step] before:absolute before:-left-[38px] before:flex before:h-7 before:w-7 before:items-center before:justify-center before:rounded-full before:border-4 before:border-background before:bg-muted before:text-xs before:font-medium before:content-[counter(install-step)]';

const styleSystem = useActiveStyleSystem();
const activeDependencies = computed(() => props.dependencies?.[styleSystem.value] ?? EMPTY_DEPENDENCIES);
const activeFiles = computed(() => props.files?.[styleSystem.value] ?? []);
</script>

<template>
  <Tabs
    default-value="cli"
    class="my-4"
  >
    <TabsList>
      <TabsTrigger value="cli">
        CLI
      </TabsTrigger>
      <TabsTrigger value="manual">
        Manual
      </TabsTrigger>
    </TabsList>

    <TabsContent value="cli">
      <PackageManagerCommand :run="`sigma-ui@latest add ${name}`" />
    </TabsContent>

    <TabsContent value="manual">
      <ol class="not-docs mt-4 list-none space-y-6 border-l !pl-6 [counter-reset:install-step]">
        <li
          v-if="activeDependencies.packages.length"
          :class="STEP_CLASS"
        >
          <p class="font-medium">
            Install the dependencies:
          </p>
          <PackageManagerCommand :install="activeDependencies.packages.join(' ')" />
        </li>
        <li
          v-if="activeDependencies.components.length"
          :class="STEP_CLASS"
        >
          <p class="font-medium">
            Add the components it uses:
            <template
              v-for="(component, index) in activeDependencies.components"
              :key="component"
            >
              <a
                :href="`/components/${component}`"
                class="font-mono underline underline-offset-4"
              >{{ component }}</a><span v-if="index < activeDependencies.components.length - 1">, </span>
            </template>
          </p>
          <PackageManagerCommand :run="`sigma-ui@latest add ${activeDependencies.components.join(' ')}`" />
        </li>
        <li
          v-if="activeDependencies.usesUtils"
          :class="STEP_CLASS"
        >
          <p class="font-medium">
            Make sure the <code class="rounded bg-muted px-1 font-mono text-sm">cn</code> helper exists in <code class="rounded bg-muted px-1 font-mono text-sm">lib/utils.ts</code>.
          </p>
          <p class="mt-1 text-sm text-muted-foreground">
            The <a
              href="/docs/installation/manual"
              class="underline underline-offset-4"
            >manual installation guide</a> shows how to create it.
          </p>
        </li>
        <li :class="STEP_CLASS">
          <p class="font-medium">
            Copy the source files into <code class="rounded bg-muted px-1 font-mono text-sm">components/ui/{{ name }}</code>:
          </p>
          <SourceFile
            v-for="file in activeFiles"
            :key="`${styleSystem}-${file.name}`"
            :name="file.name"
            :html="file.html"
          />
        </li>
      </ol>
    </TabsContent>
  </Tabs>
</template>
