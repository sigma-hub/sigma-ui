<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vitepress';
import { docsConfig } from '../config/docs';
import Logo from './Logo.vue';
import { Sheet, SheetContent, SheetTrigger } from '@ui/registry/tailwind/ui/sheet';
import { Button } from '@ui/registry/tailwind/ui/button';
import { ScrollArea } from '@ui/registry/tailwind/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ui/registry/tailwind/ui/tooltip';
import { InfoIcon } from 'lucide-vue-next';
import StyleSwitcher from '../components/StyleSwitcher.vue';
import CodeConfigCustomizer from '../components/CodeConfigCustomizer.vue';
import ThemePopover from '../components/ThemePopover.vue';

const $route = useRoute();

const open = ref(false);

function isRouteActive(href: string) {
  if (href === '/') {
    return $route.path === '/';
  }

  return $route.path.startsWith(`/${href.split('/')[1]}`);
}
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger as-child>
      <Button
        variant="ghost"
        class="mr-2 px-2 text-base flex-shrink-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
      >
        <svg
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
        >
          <path
            d="M3 5H11"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3 12H16"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3 19H21"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="sr-only">Toggle Menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent
      side="left"
      class="pr-0"
    >
      <Logo @click="open = false" />
      <ScrollArea class="my-4 h-[calc(100vh-4rem)] pb-10 pr-6">
        <div class="my-6 px-2 py-3 bg-muted/20 w-full max-w-[300px] border rounded-lg">
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
        <div class="flex flex-col space-y-3">
          <a
            v-for="item in docsConfig.mainNav"
            :key="item.href"
            :href="item.href"
            :class="{
              'text-foreground': isRouteActive(item.href || ''),
              'text-muted-foreground': !isRouteActive(item.href || ''),
            }"
            @click="open = false"
          >
            {{ item.title }}
          </a>
        </div>
        <div class="flex flex-col space-y-2">
          <div
            v-for="(items, index) in docsConfig.sidebarNav"
            :key="index"
            class="flex flex-col space-y-3 pt-6"
          >
            <div class="flex items-center">
              <h4 class="font-medium">
                {{ items.title }}
              </h4>
              <InfoLabel
                v-if="items.label"
                :text="items.label"
                class="ml-2"
              />
            </div>

            <a
              v-for="item in items.items"
              :key="item.href"
              :href="item.href"
              class="text-muted-foreground inline-flex items-center"
              @click="open = false"
            >
              {{ item.title }}

              <InfoLabel
                v-if="item.label"
                :text="item.label"
                class="ml-2"
              />
            </a>
          </div>
        </div>
      </ScrollArea>
    </SheetContent>
  </Sheet>
</template>
