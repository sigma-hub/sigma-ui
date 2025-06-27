<script setup lang="ts">
import { Separator } from '@ui/registry/tailwind/ui/separator';
import { ArrowRightIcon } from 'lucide-vue-next';
import { announcementConfig } from '../config/site';
</script>

<template>
  <a
    :href="announcementConfig.link"
    target="_blank"
    class="flex w-[fit-content] items-center rounded-lg bg-muted/50 px-3 py-1 text-sm font-medium"
  >
    {{ announcementConfig.icon }}
    <Separator
      class="mx-2 h-4 bg-white/20"
      orientation="vertical"
    />
    <div class="sm:hidden">{{ announcementConfig.title }}</div>
    <div class="hidden sm:inline ml-1">
      {{ announcementConfig.title }}
    </div>
    <ArrowRightIcon class="ml-2 h-4 w-4" />
  </a>
</template>
