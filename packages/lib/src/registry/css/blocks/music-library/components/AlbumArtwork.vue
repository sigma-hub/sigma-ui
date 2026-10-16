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
} from '@ui/registry/css/ui/context-menu';
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
  <div class="music-library__album">
    <ContextMenu>
      <ContextMenuTrigger>
        <div class="music-library__cover">
          <img
            :src="album.cover"
            :alt="album.name"
            :width="width"
            :height="height"
            class="music-library__cover-image"
            :class="isPortrait ? 'music-library__cover-image--portrait' : 'music-library__cover-image--square'"
          >
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent class="music-library__album-menu">
        <ContextMenuItem>{{ actions.addToLibrary }}</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>{{ actions.addToPlaylist }}</ContextMenuSubTrigger>
          <ContextMenuSubContent class="music-library__playlist-menu">
            <ContextMenuItem>
              <CirclePlusIcon class="music-library__menu-icon" />
              {{ actions.newPlaylist }}
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              v-for="playlist in playlists"
              :key="playlist"
            >
              <ListMusicIcon class="music-library__menu-icon" />
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
    <div class="music-library__album-meta">
      <h3 class="music-library__album-name">
        {{ album.name }}
      </h3>
      <p class="music-library__album-artist">
        {{ album.artist }}
      </p>
    </div>
  </div>
</template>

<style>
.music-library__album {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.music-library__cover {
  overflow: hidden;
  border-radius: calc(var(--radius) - 2px);
}

.music-library__cover-image {
  width: auto;
  height: auto;
  object-fit: cover;
  transition: transform 150ms ease;
}

.music-library__cover-image:hover {
  transform: scale(1.05);
}

.music-library__cover-image--portrait {
  aspect-ratio: 3 / 4;
}

.music-library__cover-image--square {
  aspect-ratio: 1;
}

.music-library__album-menu {
  width: 10rem;
}

.music-library__playlist-menu {
  width: 12rem;
}

.music-library__menu-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}

.music-library__album-meta {
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  gap: 0.25rem;
  line-height: 1.25rem;
}

.music-library__album-name,
.music-library__album-artist {
  margin: 0;
}

.music-library__album-name {
  font-weight: 500;
  line-height: 1;
}

.music-library__album-artist {
  color: var(--muted-foreground);
  font-size: 0.75rem;
  line-height: 1rem;
}
</style>
