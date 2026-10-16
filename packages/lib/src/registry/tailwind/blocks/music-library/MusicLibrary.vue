<script setup lang="ts">
import { CirclePlusIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/tailwind/ui/button';
import { ScrollArea, ScrollBar } from '@ui/registry/tailwind/ui/scroll-area';
import { Separator } from '@ui/registry/tailwind/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/registry/tailwind/ui/tabs';
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
  <div class="flex h-svh flex-col bg-background">
    <LibraryMenu :groups="menuGroups" />
    <div class="grid min-h-0 flex-1 border-t lg:grid-cols-5">
      <LibrarySidebar
        :discover="discoverSection"
        :library="librarySection"
        :playlists-title="playlistsTitle"
        :playlists="playlists"
        class="hidden lg:block"
      />
      <div class="col-span-3 min-h-0 lg:col-span-4 lg:border-l">
        <div class="h-full px-4 py-6 lg:px-8">
          <Tabs
            default-value="music"
            class="h-full space-y-6"
          >
            <div class="flex items-center">
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
              <div class="mr-4 ml-auto">
                <Button>
                  <CirclePlusIcon class="mr-2 size-4" />
                  {{ addMusicLabel }}
                </Button>
              </div>
            </div>
            <TabsContent
              value="music"
              class="border-none p-0 outline-hidden"
            >
              <div class="space-y-1">
                <h2 class="text-2xl font-semibold tracking-tight">
                  {{ listenNowTitle }}
                </h2>
                <p class="text-sm text-muted-foreground">
                  {{ listenNowDescription }}
                </p>
              </div>
              <Separator class="my-4" />
              <ScrollArea>
                <div class="flex space-x-4 pb-4">
                  <AlbumArtwork
                    v-for="album in listenNowAlbums"
                    :key="album.name"
                    class="w-[250px]"
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
              <div class="mt-6 space-y-1">
                <h2 class="text-2xl font-semibold tracking-tight">
                  {{ madeForYouTitle }}
                </h2>
                <p class="text-sm text-muted-foreground">
                  {{ madeForYouDescription }}
                </p>
              </div>
              <Separator class="my-4" />
              <ScrollArea>
                <div class="flex space-x-4 pb-4">
                  <AlbumArtwork
                    v-for="album in madeForYouAlbums"
                    :key="`${album.name}-${album.cover}`"
                    class="w-[150px]"
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
              class="h-full flex-col border-none p-0 data-[state=active]:flex"
            >
              <div class="space-y-1">
                <h2 class="text-2xl font-semibold tracking-tight">
                  {{ podcastsTitle }}
                </h2>
                <p class="text-sm text-muted-foreground">
                  {{ podcastsDescription }}
                </p>
              </div>
              <Separator class="my-4" />
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
