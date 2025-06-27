<script setup lang="ts">
import { onContentUpdated } from 'vitepress';
import { shallowRef } from 'vue';
import type { TableOfContents, TableOfContentsItem } from '../types/docs';
import TableOfContentTree from './TableOfContentTree.vue';
import { ScrollArea } from '@ui/registry/tailwind/ui/scroll-area';

const headers = shallowRef<TableOfContents>();

function getHeadingsWithHierarchy(divId: string) {
  const div = document.querySelector(divId);

  if (!div) {
    return { items: [] };
  }

  const headings: HTMLHeadingElement[] = Array.from(
    div.querySelectorAll('h2, h3'),
  );
  const hierarchy: TableOfContents = { items: [] };
  let currentLevel: TableOfContentsItem | undefined;

  headings.forEach((heading: HTMLHeadingElement) => {
    const level = Number.parseInt(heading.tagName.charAt(1));

    if (!heading.id) {
      const newId = heading.textContent
        .replaceAll(/[^a-z0-9 ]/gi, '')
        .replaceAll(' ', '-')
        .toLowerCase();
      heading.id = `${newId}`;
    }

    const item: TableOfContentsItem = {
      title: heading.textContent || '',
      url: `#${heading.id}`,
      items: [],
    };

    if (level === 2) {
      hierarchy.items.push(item);
      currentLevel = item;
    } else if (level === 3 && currentLevel?.items) {
      currentLevel.items.push(item);
    } else {
      hierarchy.items.push(item);
    }
  });
  return hierarchy;
}

onContentUpdated(() => {
  headers.value = getHeadingsWithHierarchy('.vp-doc');
});
</script>

<template>
  <ScrollArea
    orientation="vertical"
    class="z-30 md:block overflow-y-auto"
    type="hover"
  >
    <div class="space-y-2">
      <p class="font-medium">
        Table of content
      </p>
      <TableOfContentTree
        :tree="headers"
        :level="1"
      />
    </div>
  </ScrollArea>
</template>
