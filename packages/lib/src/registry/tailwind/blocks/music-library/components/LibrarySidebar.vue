<script setup lang="ts">
import { ListMusicIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/tailwind/ui/button';
import { ScrollArea } from '@ui/registry/tailwind/ui/scroll-area';
import type { NavSection } from '../data';

defineProps<{
  discover: NavSection;
  library: NavSection;
  playlistsTitle: string;
  playlists: string[];
}>();
</script>

<template>
  <div class="pb-12">
    <div class="space-y-4 py-4">
      <div
        v-for="section in [discover, library]"
        :key="section.title"
        class="px-3 py-2"
      >
        <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">
          {{ section.title }}
        </h2>
        <div class="space-y-1">
          <Button
            v-for="item in section.items"
            :key="item.label"
            :variant="item.isActive ? 'secondary' : 'ghost'"
            class="w-full justify-start"
          >
            <component
              :is="item.icon"
              class="mr-2 size-4"
            />
            {{ item.label }}
          </Button>
        </div>
      </div>
      <div class="py-2">
        <h2 class="relative px-7 text-lg font-semibold tracking-tight">
          {{ playlistsTitle }}
        </h2>
        <ScrollArea class="h-[300px] px-1">
          <div class="space-y-1 p-2">
            <Button
              v-for="playlist in playlists"
              :key="playlist"
              variant="ghost"
              class="w-full justify-start font-normal"
            >
              <ListMusicIcon class="mr-2 size-4" />
              {{ playlist }}
            </Button>
          </div>
        </ScrollArea>
      </div>
    </div>
  </div>
</template>
