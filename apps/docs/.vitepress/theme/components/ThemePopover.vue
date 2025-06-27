<script setup lang="ts">
import { PaintbrushIcon } from 'lucide-vue-next';
import { onMounted, watch } from 'vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/tailwind/ui/popover';
import ThemeCustomizer from './ThemeCustomizer.vue';
import { useConfigStore } from '@/stores/config';

type Color =
  | 'zinc'
  | 'slate'
  | 'stone'
  | 'gray'
  | 'neutral'
  | 'red'
  | 'rose'
  | 'orange'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'violet';

const allColors: Color[] = [
  'zinc',
  'rose',
  'blue',
  'green',
  'orange',
  'red',
  'slate',
  'stone',
  'gray',
  'neutral',
  'yellow',
  'violet',
];

const { config } = useConfigStore();

onMounted(() => {
  document.documentElement.style.setProperty('--radius', `${config.value.radius}rem`);
  document.documentElement.classList.add(`theme-${config.value.theme}`);
});

watch(() => config.value.theme, (theme) => {
  document.documentElement.classList.remove(
    ...allColors.map(color => `theme-${color}`),
  );
  document.documentElement.classList.add(`theme-${theme}`);
});

watch(() => config.value.radius, (radius) => {
  document.documentElement.style.setProperty('--radius', `${radius}rem`);
});
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        class="w-8 h-8 flex-shrink-0"
        :variant="'ghost'"
        :size="'icon'"
      >
        <PaintbrushIcon class="w-4 h-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent
      :side-offset="8"
      align="center"
      class="w-96"
    >
      <ThemeCustomizer :all-colors="allColors" />
    </PopoverContent>
  </Popover>
</template>
