<script setup lang="ts">
import { CirclePlusIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import { ScrollArea, ScrollBar } from '@ui/registry/css/ui/scroll-area';
import { Separator } from '@ui/registry/css/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/registry/css/ui/tabs';
import AlbumArtwork from './components/AlbumArtwork.vue';
import LibraryMenu from './components/LibraryMenu.vue';
import LibrarySidebar from './components/LibrarySidebar.vue';
import PodcastEmpty from './components/PodcastEmpty.vue';
import {
  addMusicLabel,
  addPodcastLabel,
  albumActions,
  discoverSection,
  emptyPodcastDescription,
  emptyPodcastTitle,
  importPodcastLabel,
  librarySection,
  listenNowAlbums,
  listenNowDescription,
  listenNowTitle,
  liveTabLabel,
  madeForYouAlbums,
  madeForYouDescription,
  madeForYouTitle,
  menuGroups,
  musicTabLabel,
  playlists,
  playlistsTitle,
  podcastDialogDescription,
  podcastDialogTitle,
  podcastUrlLabel,
  podcastUrlPlaceholder,
  podcastsDescription,
  podcastsTabLabel,
  podcastsTitle,
} from './data';
</script>

<template>
  <div class="music-library">
    <LibraryMenu :groups="menuGroups" />
    <div class="music-library__body">
      <LibrarySidebar
        :discover="discoverSection"
        :library="librarySection"
        :playlists-title="playlistsTitle"
        :playlists="playlists"
        class="music-library__sidebar-pane"
      />
      <div class="music-library__main">
        <div class="music-library__main-inner">
          <Tabs
            default-value="music"
            class="music-library__tabs"
          >
            <div class="music-library__toolbar">
              <TabsList>
                <TabsTrigger value="music">
                  {{ musicTabLabel }}
                </TabsTrigger>
                <TabsTrigger value="podcasts">
                  {{ podcastsTabLabel }}
                </TabsTrigger>
                <TabsTrigger
                  value="live"
                  disabled
                >
                  {{ liveTabLabel }}
                </TabsTrigger>
              </TabsList>
              <div class="music-library__add">
                <Button>
                  <CirclePlusIcon class="music-library__add-icon" />
                  {{ addMusicLabel }}
                </Button>
              </div>
            </div>
            <TabsContent
              value="music"
              class="music-library__panel"
            >
              <div class="music-library__heading">
                <h2 class="music-library__heading-title">
                  {{ listenNowTitle }}
                </h2>
                <p class="music-library__heading-description">
                  {{ listenNowDescription }}
                </p>
              </div>
              <Separator class="music-library__separator" />
              <ScrollArea>
                <div class="music-library__row">
                  <AlbumArtwork
                    v-for="album in listenNowAlbums"
                    :key="album.name"
                    class="music-library__album--listen"
                    :album="album"
                    :playlists="playlists"
                    :actions="albumActions"
                    :width="250"
                    :height="330"
                    aspect-ratio="portrait"
                  />
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
              <div class="music-library__heading music-library__heading--follow">
                <h2 class="music-library__heading-title">
                  {{ madeForYouTitle }}
                </h2>
                <p class="music-library__heading-description">
                  {{ madeForYouDescription }}
                </p>
              </div>
              <Separator class="music-library__separator" />
              <ScrollArea>
                <div class="music-library__row">
                  <AlbumArtwork
                    v-for="album in madeForYouAlbums"
                    :key="`${album.name}-${album.cover}`"
                    class="music-library__album--made"
                    :album="album"
                    :playlists="playlists"
                    :actions="albumActions"
                    :width="150"
                    :height="150"
                    aspect-ratio="square"
                  />
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsContent>
            <TabsContent
              value="podcasts"
              class="music-library__podcasts"
            >
              <div class="music-library__heading">
                <h2 class="music-library__heading-title">
                  {{ podcastsTitle }}
                </h2>
                <p class="music-library__heading-description">
                  {{ podcastsDescription }}
                </p>
              </div>
              <Separator class="music-library__separator" />
              <PodcastEmpty
                :title="emptyPodcastTitle"
                :description="emptyPodcastDescription"
                :add-label="addPodcastLabel"
                :dialog-title="podcastDialogTitle"
                :dialog-description="podcastDialogDescription"
                :url-label="podcastUrlLabel"
                :url-placeholder="podcastUrlPlaceholder"
                :import-label="importPodcastLabel"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.music-library {
  display: flex;
  height: 100svh;
  flex-direction: column;
  background: var(--background);
}

.music-library__body {
  display: grid;
  min-height: 0;
  flex: 1;
  border-top: 1px solid var(--border);
}

.music-library__sidebar-pane {
  display: none;
}

.music-library__main {
  min-height: 0;
}

.music-library__main-inner {
  height: 100%;
  padding: 1.5rem 1rem;
}

.music-library__tabs {
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 1.5rem;
}

.music-library__toolbar,
.music-library__row {
  display: flex;
}

.music-library__toolbar {
  align-items: center;
}

.music-library__add {
  margin-right: 1rem;
  margin-left: auto;
}

.music-library__add-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}

.music-library__panel {
  padding: 0;
  border: none;
  outline: none;
}

.music-library__heading {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.music-library__heading--follow {
  margin-top: 1.5rem;
}

.music-library__heading-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 2rem;
}

.music-library__heading-description {
  margin: 0;
  color: var(--muted-foreground);
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.music-library__separator {
  margin: 1rem 0;
}

.music-library__row {
  padding-bottom: 1rem;
  gap: 1rem;
}

.music-library__album--listen {
  width: 250px;
  flex: 0 0 auto;
}

.music-library__album--made {
  width: 150px;
  flex: 0 0 auto;
}

.music-library__podcasts {
  display: none;
  height: 100%;
  flex-direction: column;
  padding: 0;
  border: none;
}

.music-library__podcasts[data-state='active'] {
  display: flex;
}

@media (width >= 1024px) {
  .music-library__body {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .music-library__sidebar-pane {
    display: block;
  }

  .music-library__main {
    border-left: 1px solid var(--border);
    grid-column: span 4;
  }

  .music-library__main-inner {
    padding: 1.5rem 2rem;
  }
}
</style>
