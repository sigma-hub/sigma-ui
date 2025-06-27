<script setup lang="ts">
import { useRoute } from 'vitepress';
import { InfoIcon } from 'lucide-vue-next';
import StyleSwitcher from '../components/StyleSwitcher.vue';
import CodeConfigCustomizer from '../components/CodeConfigCustomizer.vue';
import ThemePopover from '../components/ThemePopover.vue';
import type { SidebarNavItem } from '../config/docs';
import { ScrollArea } from '@ui/registry/tailwind/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ui/registry/tailwind/ui/tooltip';

interface Props {
  navItemGroups: SidebarNavItem[];
}

const props = defineProps<Props>();

const $route = useRoute();

function getIsActiveDoc(doc: SidebarNavItem) {
  if (doc.items?.length) {
    return doc.items.some(item => $route.path === `${item.href}.html`) || $route.path === `${doc.href}.html`;
  }

  return $route.path === `${doc.href}.html`;
}
</script>

<template>
  <aside class="fixed top-14 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-hidden">
    <div class="my-6 px-3 py-3 bg-muted/20 sticky top-0 left-0 w-full border rounded-lg">
      <div class="mb-2 flex items-center gap-2">
        <div>
          Config options
        </div>
        <TooltipProvider :delay-duration="0">
          <Tooltip>
            <TooltipTrigger as-child>
              <InfoIcon class="w-4 h-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>These settings affect examples in the docs.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div class="flex items-center justify-between gap-1">
        <StyleSwitcher class="w-full" />
        <ThemePopover />
        <CodeConfigCustomizer />
      </div>
    </div>
    <ScrollArea
      orientation="vertical"
      class="relative overflow-hidden h-[calc(100vh-210px)] pr-6"
      :type="'auto'"
    >
      <div class="w-full">
        <div
          v-for="group in props.navItemGroups"
          :key="group.title"
          class="pb-4"
        >
          <h4
            class="mb-1 rounded-md px-2 py-1 text-sm font-semibold"
          >
            {{ group.title }}

            <InfoLabel
              v-if="group.label"
              :text="group.label"
              class="ml-2"
            />
          </h4>

          <div
            v-for="doc in group.items"
            :key="doc.title"
            class="grid grid-flow-row auto-rows-max text-sm"
          >
            <a
              v-if="doc.href"
              :disabled="doc.disabled"
              :href="doc.href"
              class="
                group flex w-full items-center border-l ml-4 px-4 py-1.5
                text-muted-foreground hover:text-foreground hover:border-primary
              "
              :class="{
                '!font-semibold !text-foreground border-primary': getIsActiveDoc(doc),
              }"
            >
              {{ doc.title }}
              <InfoLabel
                v-if="doc.label"
                :text="doc.label"
                class="ml-2"
              />
            </a>

            <div
              v-if="doc.items?.length"
              class="ml-8"
            >
              <a
                v-for="subDoc in doc.items"
                :key="subDoc.title"
                :disabled="subDoc.disabled"
                :href="subDoc.href"
                class="
                  group flex w-full items-center border-l px-4 py-1.5
                  text-muted-foreground hover:text-foreground hover:border-primary
                "
                :class="{
                  '!font-semibold !text-foreground border-primary': getIsActiveDoc(subDoc),
                }"
              >
                {{ subDoc.title }}
                <InfoLabel
                  v-if="subDoc.label"
                  :text="subDoc.label"
                  class="ml-2"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  </aside>
</template>
