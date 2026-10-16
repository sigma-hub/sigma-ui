<script setup lang="ts">
import { Separator } from '@ui/registry/tailwind/ui/separator';
import { SidebarTrigger } from '@ui/registry/tailwind/ui/sidebar';

defineProps<{
  title: string;
}>();
</script>

<template>
  <header class="flex h-14 shrink-0 items-center gap-2 border-b px-4">
    <SidebarTrigger class="-ml-1" />
    <Separator
      orientation="vertical"
      class="mr-2 h-4!"
    />
    <span class="text-sm font-medium">{{ title }}</span>
  </header>
</template>
