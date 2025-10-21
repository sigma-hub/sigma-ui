<script setup lang="ts">
import { PaintbrushIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/tailwind/ui/popover';
import ThemeCustomizer from './ThemeCustomizer.vue';
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
      class="w-[500px]"
    >
      <ThemeCustomizer />
    </PopoverContent>
  </Popover>
</template>
