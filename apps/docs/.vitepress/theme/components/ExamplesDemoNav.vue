<script setup lang="ts">
import { cn } from '@ui/utils';
import { ScrollArea, ScrollBar } from '@ui/registry/tailwind/ui/scroll-area';
import { useExamplesStore } from '@/stores/examples';
import Button from '~/packages/lib/src/registry/tailwind/ui/button/Button.vue';

const examplesStore = useExamplesStore();
</script>

<template>
  <div class="relative">
    <ScrollArea class="max-w-[600px] lg:max-w-none rounded-lg">
      <div :class="cn('flex flex-wrap gap-1 items-center md:px-1 md:py-2 ', $attrs.class ?? '')">
        <Button
          v-for="example in examplesStore.examples"
          :key="example.name"
          size="sm"
          variant="ghost"
          :class="cn(
            'h-6 flex items-center capitalize text-xs md:text-sm px-2 md:px-3',
            examplesStore.currentExample?.name === example.name
              ? 'font-bold text-primary bg-muted'
              : 'font-medium text-muted-foreground',
          )"
          @click="examplesStore.setSelectedExample(example.name)"
        >
          {{ example.name }}
        </Button>
      </div>
      <ScrollBar
        orientation="horizontal"
        class="invisible"
      />
    </ScrollArea>
  </div>
</template>
