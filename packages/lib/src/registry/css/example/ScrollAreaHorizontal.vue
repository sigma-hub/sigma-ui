<script setup lang="ts">
import { ScrollArea, ScrollBar } from '@ui/registry/css/ui/scroll-area';

interface Artwork {
  id: string;
  artist: string;
  art: string;
}

const works: Artwork[] = [
  {
    id: '1',
    artist: 'Ornella Binni',
    art: 'https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '2',
    artist: 'Tom Byrom',
    art: 'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '3',
    artist: 'Vladimir Malyavko',
    art: 'https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80',
  },
];
</script>

<template>
  <ScrollArea class="example-sigma-ui-scroll-area-horizontal">
    <div class="example-sigma-ui-scroll-area-horizontal__content">
      <div
        v-for="artwork in works"
        :key="artwork.id"
        class="example-sigma-ui-scroll-area-horizontal__artwork"
      >
        <figure class="example-sigma-ui-scroll-area-horizontal__figure">
          <div class="example-sigma-ui-scroll-area-horizontal__image-container">
            <img
              :src="artwork.art"
              :alt="`Photo by ${artwork.artist}`"
              class="example-sigma-ui-scroll-area-horizontal__image"
            >
          </div>
          <figcaption class="example-sigma-ui-scroll-area-horizontal__caption">
            Photo by
            <span class="example-sigma-ui-scroll-area-horizontal__artist">
              {{ artwork.artist }}
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
</template>

<style>
@layer components {
  .example-sigma-ui-scroll-area-horizontal {
    width: calc(var(--spacing) * 96);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    white-space: nowrap;
  }

  .example-sigma-ui-scroll-area-horizontal__content {
    display: flex;
    width: max-content;
    padding: calc(var(--spacing) * 4);
    gap: calc(var(--spacing) * 4);
  }

  .example-sigma-ui-scroll-area-horizontal__figure {
    flex-shrink: 0;
  }

  .example-sigma-ui-scroll-area-horizontal__image-container {
    overflow: hidden;
    border-radius: var(--radius);
  }

  .example-sigma-ui-scroll-area-horizontal__image {
    width: calc(var(--spacing) * 36);
    height: calc(var(--spacing) * 56);
    aspect-ratio: 3/4;
    object-fit: cover;
  }

  .example-sigma-ui-scroll-area-horizontal__caption {
    padding-top: calc(var(--spacing) * 2);
    color: var(--muted-foreground);
    font-size: 0.75rem;
  }

  .example-sigma-ui-scroll-area-horizontal__artist {
    color: var(--foreground);
    font-weight: 600;
  }
}
</style>
