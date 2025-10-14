<script lang="ts" setup>
import { useData } from 'vitepress';
import { CheckIcon, MoonIcon, PanelBottomOpenIcon, SunIcon } from 'lucide-vue-next';
import { useToggle } from '@vueuse/core';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Collapsible, CollapsibleContent } from '@ui/registry/tailwind/ui/collapsible';
import { Separator } from '@ui/registry/tailwind/ui/separator';
import { Label } from '@ui/registry/tailwind/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@ui/registry/tailwind/ui/dialog';
import { baseColors } from '../../../src/lib/registry/colors';
import ThemeCustomizerCode from '../components/ThemeCustomizerCode.vue';
import { colors } from '@/lib/registry';
import { BACKDROP_FILTER_BLURS, RADII, useConfigStore } from '@/stores/config';
import { computed } from 'vue';

const { config, setBackdropFilterBlur, setRadius, setTheme } = useConfigStore();
const { isDark } = useData();
const toggleDark = useToggle(isDark);

const showBackdropFilterBlur = computed(() => config.value.theme === 'frosted-glass');

const getButtonColor = (color: string) => {
  if (color === 'frosted-glass') {
    return '#587aa9';
  }

  // @ts-expect-error ignore
  return colors[color][7].rgb;
};
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="grid space-y-2">
      <div class="flex items-center justify-between">
        <h1 class="text-md text-foreground font-semibold">
          Customize
        </h1>
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
      </div>

      <Separator />

      <p class="mt-4 text-xs text-muted-foreground">
        This configurator will help you modify the styles of components that you already have in your project.
        <br><br>Config the styles below and then copy / paste CSS variables into your project.
      </p>
    </div>
    <div class="flex flex-col gap-y-2">
      <Label
        for="color"
        class="text-xs"
      >
        Color
      </Label>

      <div class="grid grid-cols-3 gap-2">
        <Button
          v-for="(color, index) in baseColors"
          :key="index"
          variant="outline"
          class="h-9 flex w-full justify-start px-3"
          :class="
            color.name === config.theme
              ? 'border-foreground border-2'
              : ''
          "
          @click="setTheme(color.name)"
        >
          <span
            class="h-5 w-5 rounded-sm border border-border flex items-center justify-center"
            :style="{ backgroundColor: getButtonColor(color.name) }"
          >
            <CheckIcon
              v-if="color.name === config.theme"
              class="h-3 w-3 text-white"
            />
          </span>
          <span class="ml-2 text-xs capitalize">
            {{ color.label }}
          </span>
        </Button>
      </div>
    </div>

    <div class="flex flex-col gap-y-2">
      <Label
        for="radius"
        class="text-xs"
      >
        Radius
      </Label>

      <div class="grid grid-cols-5 gap-2">
        <Button
          v-for="(r, index) in RADII"
          :key="index"
          variant="outline"
          class="h-8 flex w-full justify-center px-3"
          :class="
            r === config.radius
              ? 'border-foreground border-2'
              : ''
          "
          @click="setRadius(r)"
        >
          <span class="text-xs">
            {{ r }}
          </span>
        </Button>
      </div>
    </div>

    <Collapsible
      v-model:open="showBackdropFilterBlur"
      class="flex flex-col gap-2"
    >
      <CollapsibleContent>
        <Label
          for="radius"
          class="text-xs"
        >
          Backdrop Filter Blur
        </Label>

        <div class="grid grid-cols-5 gap-2">
          <Button
            v-for="(value, index) in BACKDROP_FILTER_BLURS"
            :key="index"
            variant="outline"
            class="h-8 flex w-full justify-center px-3"
            :class="
              value === config.backdropFilterBlur
                ? 'border-foreground border-2'
                : ''
            "
            @click="setBackdropFilterBlur(value)"
          >
            <span class="text-xs">
              {{ value }}px
            </span>
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>

    <div class="flex flex-col gap-y-2">
      <Label
        for="theme"
        class="text-xs"
      >
        Copy the code
      </Label>

      <div>
        <Dialog>
          <DialogTrigger as-child>
            <Button class="h-9 rounded-md">
              <PanelBottomOpenIcon class="w-4 h-4 mr-2" />
              Show CSS variables
            </Button>
          </DialogTrigger>
          <DialogContent class="w-[500px] sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Theme</DialogTitle>
              <DialogDescription>
                Copy and paste the following code into your CSS file.
              </DialogDescription>
            </DialogHeader>
            <ThemeCustomizerCode />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </div>
</template>
