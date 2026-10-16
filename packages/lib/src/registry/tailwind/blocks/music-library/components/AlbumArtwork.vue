<script setup lang="ts">
import { computed } from 'vue';
import { CirclePlusIcon, ListMusicIcon } from 'lucide-vue-next';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@ui/registry/tailwind/ui/context-menu';
import type { Album } from '../data';

const props = withDefaults(defineProps<{
  album: Album;
  playlists: string[];
  actions: {
    addToLibrary: string;
    addToPlaylist: string;
    newPlaylist: string;
    playNext: string;
    playLater: string;
    createStation: string;
    like: string;
    share: string;
  };
  aspectRatio?: 'portrait' | 'square';
  width?: number;
  height?: number;
}>(), {
  aspectRatio: 'portrait',
  width: 250,
  height: 330,
});

const isPortrait = computed(() => props.aspectRatio === 'portrait');
</script>

<template>
  <div class="space-y-3">
    <ContextMenu>
      <ContextMenuTrigger>
        <div class="overflow-hidden rounded-md">
          <img
            :src="album.cover"
            :alt="album.name"
            :width="width"
            :height="height"
            class="h-auto w-auto object-cover transition-all hover:scale-105"
            :class="isPortrait ? 'aspect-[3/4]' : 'aspect-square'"
          >
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent class="w-40">
        <ContextMenuItem>{{ actions.addToLibrary }}</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>{{ actions.addToPlaylist }}</ContextMenuSubTrigger>
          <ContextMenuSubContent class="w-48">
            <ContextMenuItem>
              <CirclePlusIcon class="mr-2 size-4" />
              {{ actions.newPlaylist }}
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              v-for="playlist in playlists"
              :key="playlist"
            >
              <ListMusicIcon class="mr-2 size-4" />
              {{ playlist }}
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>{{ actions.playNext }}</ContextMenuItem>
        <ContextMenuItem>{{ actions.playLater }}</ContextMenuItem>
        <ContextMenuItem>{{ actions.createStation }}</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>{{ actions.like }}</ContextMenuItem>
        <ContextMenuItem>{{ actions.share }}</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
    <div class="space-y-1 text-sm">
      <h3 class="leading-none font-medium">
        {{ album.name }}
      </h3>
      <p class="text-xs text-muted-foreground">
        {{ album.artist }}
      </p>
    </div>
  </div>
</template>
