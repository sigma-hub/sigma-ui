<script setup lang="ts">
import { useMagicKeys, useToggle } from '@vueuse/core';
import { computed, onMounted, ref, watch } from 'vue';
import { Content, useData, useRoute, useRouter } from 'vitepress';
import { CircleIcon, FileIcon, GithubIcon, MoonIcon, SearchIcon, SunIcon } from 'lucide-vue-next';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@ui/registry/tailwind/ui/command';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Dialog, DialogContent } from '@ui/registry/tailwind/ui/dialog';
import { Toaster as TailwindToaster } from '@ui/registry/tailwind/ui/toaster';
import { Toaster as CSSToaster } from '@ui/registry/css/ui/toaster';
import { TooltipProvider } from '@ui/registry/tailwind/ui/tooltip';
import Infusion from '@ui/registry/tailwind/ui/infusion/Infusion.vue';
import Separator from '@ui/registry/tailwind/ui/separator/Separator.vue';
import Kbd from '../components/Kbd.vue';
import MobileNav from '../components/MobileNav.vue';
import Logo from '../components/Logo.vue';
import { type NavItem, docsConfig } from '../config/docs';
import { useConfigStore } from '@/stores/config';
import { baseColors } from '../../../src/lib/registry/themes';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@ui/registry/tailwind/ui/tooltip';

const { config } = useConfigStore();

onMounted(() => {
  setTimeout(() => {
    console.log('config', config.value);
    console.log('config.infusionNoiseOpacity', config.value.infusionNoiseOpacity);
  }, 1000);
  console.log('config', config.value);
  console.log('config.infusionNoiseOpacity', config.value.infusionNoiseOpacity);

  document.documentElement.style.setProperty('--radius', `${config.value.radius}rem`);
  document.documentElement.style.setProperty('--backdrop-filter-blur', `${config.value.backdropFilterBlur}px`);
  document.documentElement.classList.add(`theme-${config.value.theme}`);

  if (config.value.infusionEnabled) {
    document.documentElement.style.setProperty('--infusion-opacity', config.value.infusionImageOpacity.toString());
    document.documentElement.style.setProperty('--infusion-opacity-dark', config.value.infusionImageOpacityDark.toString());
    document.documentElement.style.setProperty('--infusion-blur', `${config.value.infusionBlur}px`);
    document.documentElement.style.setProperty('--infusion-noise-intensity', config.value.infusionNoiseIntensity.toString());
    document.documentElement.style.setProperty('--infusion-noise-opacity', config.value.infusionNoiseOpacity.toString());
  }
});

const { frontmatter, isDark } = useData();

const $route = useRoute();
const $router = useRouter();
const toggleDark = useToggle(isDark);

const links = [
  {
    name: 'GitHub',
    href: 'https://github.com/sigma-hub/sigma-ui',
    icon: GithubIcon,
  },
];

const isOpen = ref(false);
const { Meta_K, Ctrl_K } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
    }
  },
});

watch([Meta_K, Ctrl_K], (v) => {
  if (v[0] || v[1]) {
    isOpen.value = true;
  }
});

function handleSelectLink(item: NavItem) {
  if (item.external) {
    window.open(item.href, '_blank');
  } else {
    $router.go(item.href);
  }

  isOpen.value = false;
}

watch(() => $route.path, () => {
  if (document.startViewTransition) {
    document.startViewTransition(() => {});
  }
});

function isRouteActive(href: string) {
  if (href === '/') {
    return $route.path === '/';
  }

  return $route.path.startsWith(`/${href.split('/')[1]}`);
}

const appVersion = computed(() => {
  return `v${import.meta.env.VITE_APP_VERSION}`;
});

const isConfigReady = computed(() => {
  return config.value && typeof config.value.infusionNoiseIntensity === 'number';
});

watch(() => config.value.radius, (radius) => {
  document.documentElement.style.setProperty('--radius', `${radius}rem`);
});

watch(() => config.value.backdropFilterBlur, (backdropFilterBlur) => {
  document.documentElement.style.setProperty('--backdrop-filter-blur', `${backdropFilterBlur}px`);
});

watch(() => config.value.infusionEnabled, (enabled) => {
  if (enabled) {
    document.documentElement.style.setProperty('--infusion-opacity', config.value.infusionImageOpacity.toString());
    document.documentElement.style.setProperty('--infusion-opacity-dark', config.value.infusionImageOpacityDark.toString());
    document.documentElement.style.setProperty('--infusion-blur', `${config.value.infusionBlur}px`);
    document.documentElement.style.setProperty('--infusion-noise-intensity', config.value.infusionNoiseIntensity.toString());
    document.documentElement.style.setProperty('--infusion-noise-opacity', config.value.infusionNoiseOpacity.toString());
  }
});

watch(() => config.value.infusionImageOpacity, (opacity) => {
  document.documentElement.style.setProperty('--infusion-opacity', opacity.toString());
});

watch(() => config.value.infusionImageOpacityDark, (opacity) => {
  document.documentElement.style.setProperty('--infusion-opacity-dark', opacity.toString());
});

watch(() => config.value.infusionBlur, (blur) => {
  document.documentElement.style.setProperty('--infusion-blur', `${blur}px`);
});

watch(() => config.value.infusionNoiseIntensity, (intensity) => {
  document.documentElement.style.setProperty('--infusion-noise-intensity', intensity.toString());
});

watch(() => config.value.infusionNoiseOpacity, (opacity) => {
  document.documentElement.style.setProperty('--infusion-noise-opacity', opacity.toString());
});

watch(() => config.value.theme, (theme) => {
  document.documentElement.classList.remove(
    ...baseColors.map(color => `theme-${color.name}`),
  );
  document.documentElement.classList.add(`theme-${theme}`);
});
</script>

<template>
  <TooltipProvider>
    <template v-if="$route.data.frontmatter.layout === false">
      <Content :key="$route.path" />
    </template>
    <template v-else>
      <Infusion
        v-if="config.infusionEnabled && isConfigReady"
        src="/infusion-bg.png"
        :opacity="config.infusionImageOpacity"
        :opacity-dark="config.infusionImageOpacityDark"
        :blur="config.infusionBlur"
        :noise-intensity="config.infusionNoiseIntensity"
        :noise-opacity="config.infusionNoiseOpacity"
      />
      <div
        vaul-drawer-wrapper
        class="flex min-h-screen flex-col bg-background"
      >
        <header class="animate-fade-in z-50 sticky top-0 bg-muted/50 border-b dark:border-none dark:bg-muted/20 backdrop-blur-lg">
          <div
            class="container flex h-14 items-center"
          >
            <div class="mr-4 md:mr-1 hidden lg:flex">
              <Logo />

              <nav
                class="flex items-center max-lg:space-x-4 space-x-2 text-sm font-medium"
              >
                <a
                  v-for="route in docsConfig.mainNav"
                  :key="route.title"
                  :href="route.href"
                  :target="route.external ? '_target' : undefined"
                  class="py-2 px-2 rounded-md transition-colors hover:text-foreground/80 text-foreground/60 lg:px-4"
                  :class="{
                    'font-semibold !text-foreground bg-background/50 dark:bg-muted/50': isRouteActive(route.href ?? ''),
                    'hidden lg:block': route?.href?.includes('github'),
                  }"
                >
                  {{ route.title }}
                  <InfoLabel
                    v-if="route.title === 'Blocks'"
                    text="Alpha"
                  />
                  <InfoLabel
                    v-if="route.title === 'Changelog' && appVersion"
                    :text="appVersion"
                  />
                </a>
              </nav>
            </div>

            <MobileNav />

            <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <div class="w-full flex-1 md:w-auto md:flex-none">
                <Button
                  variant="outline"
                  class="relative h-8 w-full justify-start rounded-[0.5rem] bg-muted border-border dark:bg-background/20 dark:border-border/80 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
                  @click="isOpen = true"
                >
                  <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                    <SearchIcon class="size-4 text-muted-foreground/50" />
                  </span>
                  <span class="ml-4 hidden lg:inline-flex">Search docs</span>
                  <span class="ml-4 inline-flex lg:hidden">Search</span>
                  <Kbd class="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span class="text-xs">⌘</span>K
                  </Kbd>
                </Button>
              </div>

              <nav class="flex items-center">
                <Tooltip :delay-duration="100">
                  <TooltipTrigger as-child>
                    <Button
                      v-for="link in links"
                      :key="link.name"
                      as="a"
                      class="w-9 h-9"
                      :href="link.href"
                      target="_blank"
                      :variant="'ghost'"
                      :size="'icon'"
                    >
                      <component
                        :is="link.icon"
                        class="w-5 h-5"
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Project page on Github
                    <div class="text-xs text-muted-foreground w-[220px]">
                      Place where you can find the source code, discuss new features with the community, and report issues.
                    </div>
                  </TooltipContent>
                </Tooltip>

                <ClientOnly>
                  <Tooltip :delay-duration="100">
                    <TooltipTrigger as-child>
                      <Button
                        class="w-9 h-9"
                        aria-label="Toggle dark mode"
                        :variant="'ghost'"
                        :size="'icon'"
                        @click="toggleDark()"
                      >
                        <div class="w-5 h-5">
                          <component
                            :is="isDark ? SunIcon : MoonIcon"
                            class="w-full h-full text-foreground"
                          />
                        </div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Toggle dark mode
                    </TooltipContent>
                  </Tooltip>
                </ClientOnly>
              </nav>
            </div>
          </div>
        </header>

        <div class="flex-1 bg-background">
          <Transition
            name="fade"
            mode="out-in"
          >
            <component
              :is="'docs'"
              v-if="$route.path.startsWith('/docs')"
            >
              <Transition
                name="fade"
                mode="out-in"
              >
                <Content :key="$route.path" />
              </Transition>
            </component>
            <component
              :is="'components'"
              v-else-if="$route.path.startsWith('/components')"
            >
              <Transition
                name="fade"
                mode="out-in"
              >
                <Content :key="$route.path" />
              </Transition>
            </component>
            <component
              :is="'blocks'"
              v-else-if="$route.path.startsWith('/blocks')"
            >
              <Transition
                name="fade"
                mode="out-in"
              >
                <Content :key="$route.path" />
              </Transition>
            </component>
            <component
              :is="'examples'"
              v-else-if="$route.path.includes('examples')"
            >
              <Transition
                name="fade"
                mode="out-in"
              >
                <Content :key="$route.path" />
              </Transition>
            </component>
            <component
              :is="frontmatter.layout"
              v-else-if="frontmatter.layout"
            >
              <slot />
            </component>
            <main
              v-else
              class="container"
            >
              <Transition
                name="fade"
                mode="out-in"
              >
                <Content :key="$route.path" />
              </Transition>
            </main>
          </Transition>
        </div>

        <Dialog v-model:open="isOpen">
          <DialogContent class="p-0">
            <Command>
              <CommandInput placeholder="Type a command or search" />
              <CommandEmpty>
                No results found.
              </CommandEmpty>
              <CommandList
                @escape-key-down=" isOpen = false"
              >
                <CommandGroup heading="Links">
                  <CommandItem
                    v-for="item in docsConfig.mainNav"
                    :key="item.title"
                    :heading="item.title"
                    :value="item.title"
                    class="py-3"
                    @select="handleSelectLink(item)"
                  >
                    <FileIcon class="mr-2 h-5 w-5" />
                    <span>{{ item.title }}</span>
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator />
                <CommandGroup
                  v-for="item in docsConfig.sidebarNav"
                  :key="item.title"
                  :heading="item.title"
                >
                  <CommandItem
                    v-for="subItem in item.items"
                    :key="subItem.title"
                    :heading="subItem.title"
                    :value="subItem.title"
                    class="py-3"
                    @select="
                      handleSelectLink(subItem)"
                  >
                    <CircleIcon class="mr-2 h-4 w-4" />
                    <span>{{ subItem.title }}</span>
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator />
                <CommandGroup heading="Theme">
                  <CommandItem
                    value="light-theme"
                    class="py-3"
                    @select="
                      () => {
                        isDark = false;
                        isOpen = false;
                      }
                    "
                  >
                    <SunIcon class="mr-2 h-5 w-5" />
                    <span>Light Theme</span>
                  </CommandItem>

                  <CommandItem
                    value="dark-theme"
                    class="py-3"
                    @select="
                      () => {
                        isDark = true;
                        isOpen = false;
                      }
                    "
                  >
                    <MoonIcon class="mr-2 h-5 w-5" />
                    <span>Dark Theme</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </DialogContent>
        </Dialog>
        <TailwindToaster v-if="config.styleSystem === 'tailwind'" />
        <CSSToaster v-if="config.styleSystem === 'css'" />
        <footer class="mb-8 container">
          <Separator class="mt-20 mb-8" />
          <div class="block items-center gap-1 text-gray-400">
            <div>
              Created and maintained by
              <a
                class="font-bold"
                href="https://github.com/aleksey-hoffman"
                target="_blank"
              >Aleksey Hoffman
              </a>
            </div>
            <div>
              The source code is available on
              <a
                class="font-bold"
                href="https://github.com/sigma-hub/sigma-ui"
                target="_blank"
              >GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </template>
  </TooltipProvider>
</template>
