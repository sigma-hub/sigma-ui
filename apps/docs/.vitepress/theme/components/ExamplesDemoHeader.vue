<script setup lang="ts">
import { PaintbrushIcon } from 'lucide-vue-next';
import { onMounted, watch } from 'vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/tailwind/ui/popover';
import { Card, CardContent } from '@ui/registry/tailwind/ui/card';
import ThemeCustomizer from '../components/ThemeCustomizer.vue';
import ThemePickerMini from '../components/ThemePickerMini.vue';
import { useConfigStore } from '@/stores/config';
import { useExamplesStore } from '@/stores/examples';
import ExamplesDemoNav from '../components/ExamplesDemoNav.vue';
import { GithubIcon } from 'lucide-vue-next';
import { baseColors } from '../../../src/lib/registry/colors';

const examplesStore = useExamplesStore();
const { config } = useConfigStore();

onMounted(() => {
  document.documentElement.style.setProperty('--radius', `${config.value.radius}rem`);
  document.documentElement.style.setProperty('--backdrop-filter-blur', `${config.value.backdropFilterBlur}px`);
  document.documentElement.classList.add(`theme-${config.value.theme}`);
});

watch(() => config.value.theme, (theme) => {
  document.documentElement.classList.remove(
    ...baseColors.map(color => `theme-${color.name}`),
  );
  document.documentElement.classList.add(`theme-${theme}`);
});

watch(() => config.value.radius, (radius) => {
  document.documentElement.style.setProperty('--radius', `${radius}rem`);
});

watch(() => config.value.backdropFilterBlur, (backdropFilterBlur) => {
  document.documentElement.style.setProperty('--backdrop-filter-blur', `${backdropFilterBlur}px`);
});
</script>

<template>
  <Card>
    <CardContent class="px-2 py-2 md:px-4 md:py-2 flex flex-col flex-wrap items-baseline gap-2 md:gap-4 justify-between md:flex-row md:items-center ">
      <ExamplesDemoNav />
      <div class="flex gap-4 items-center">
        <a
          v-if="examplesStore.currentExample?.code"
          :href="examplesStore.currentExample.code"
          target="_blank"
          rel="nofollow"
          class="hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
        >
          <Button
            size="sm"
            variant="outline"
          >
            <GithubIcon class="mr-2 h-4 w-4" />
            View code
          </Button>
        </a>
        <Popover>
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              class="flex h-7 md:h-9 rounded-[0.5rem]"
            >
              <PaintbrushIcon class="w-4 h-4 mr-2" />
              Customize
            </Button>
          </PopoverTrigger>
          <PopoverContent
            :side-offset="8"
            align="end"
            class="w-[500px]"
          >
            <ThemeCustomizer />
          </PopoverContent>
        </Popover>
        <ThemePickerMini class="gap-x-0 flex md:gap-x-1" />
      </div>
    </CardContent>
  </Card>
</template>
