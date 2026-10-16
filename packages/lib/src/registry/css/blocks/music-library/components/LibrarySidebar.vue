<script setup lang="ts">
import { ListMusicIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import { ScrollArea } from '@ui/registry/css/ui/scroll-area';
import type { NavSection } from '../data';

defineProps<{
  discover: NavSection;
  library: NavSection;
  playlistsTitle: string;
  playlists: string[];
}>();
</script>

<template>
  <div class="music-library__sidebar">
    <div class="music-library__sidebar-sections">
      <div
        v-for="section in [discover, library]"
        :key="section.title"
        class="music-library__sidebar-section"
      >
        <h2 class="music-library__sidebar-title">
          {{ section.title }}
        </h2>
        <div class="music-library__sidebar-links">
          <Button
            v-for="item in section.items"
            :key="item.label"
            :variant="item.isActive ? 'secondary' : 'ghost'"
            class="music-library__sidebar-link"
          >
            <component
              :is="item.icon"
              class="music-library__nav-icon"
            />
            {{ item.label }}
          </Button>
        </div>
      </div>
      <div class="music-library__playlists">
        <h2 class="music-library__playlists-title">
          {{ playlistsTitle }}
        </h2>
        <ScrollArea class="music-library__playlists-scroll">
          <div class="music-library__sidebar-links">
            <Button
              v-for="playlist in playlists"
              :key="playlist"
              variant="ghost"
              class="music-library__sidebar-link music-library__sidebar-link--playlist"
            >
              <ListMusicIcon class="music-library__nav-icon" />
              {{ playlist }}
            </Button>
          </div>
        </ScrollArea>
      </div>
    </div>
  </div>
</template>

<style>
.music-library__sidebar {
  padding-bottom: 3rem;
}

.music-library__sidebar-sections {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  gap: 1rem;
}

.music-library__sidebar-section {
  padding: 0.5rem 0.75rem;
}

.music-library__sidebar-title,
.music-library__playlists-title {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.75rem;
}

.music-library__sidebar-title {
  padding: 0 1rem;
}

.music-library__playlists-title {
  padding: 0 1.75rem;
}

.music-library__sidebar-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.music-library__sidebar-link {
  width: 100%;
  justify-content: flex-start;
}

.music-library__sidebar-link--playlist {
  font-weight: 400;
}

.music-library__nav-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}

.music-library__playlists {
  padding: 0.5rem 0;
}

.music-library__playlists-scroll {
  height: 300px;
  padding: 0 0.25rem;
}

.music-library__playlists .music-library__sidebar-links {
  padding: 0.5rem;
}
</style>
