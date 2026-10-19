---
title: Pagination
description: Displays data in paged format and provides navigation between pages.
source: pagination
primitive: https://reka-ui.com/docs/components/pagination
---

## Preview

<ComponentPreview name="Pagination" />

## Installation

<ComponentInstall name="pagination" />

## Usage

```vue
<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
</script>

<template>
  <Pagination
    v-slot="{ page }"
    :total="100"
    :items-per-page="10"
    :default-page="1"
  >
    <PaginationList
      v-slot="{ items }"
      class="flex items-center gap-1"
    >
      <PaginationPrev />
      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child
        >
          <Button :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis
          v-else
          :key="item.type"
          :index="index"
        />
      </template>
      <PaginationNext />
    </PaginationList>
  </Pagination>
</template>
```

- `total` and `itemsPerPage` set the number of pages. Use `v-model:page` to control the current page, or `defaultPage` to set the initial one.
- `PaginationList` exposes the `items` to render, either pages or ellipses. `siblingCount` sets how many pages are shown around the current one.

## Examples

### With First and Last Buttons

Add `PaginationFirst` and `PaginationLast` to jump to the edges, and `show-edges` to always display the first and last pages.

```vue
<template>
  <Pagination
    v-slot="{ page }"
    :total="100"
    :items-per-page="10"
    :sibling-count="1"
    show-edges
    :default-page="2"
  >
    <PaginationList
      v-slot="{ items }"
      class="flex items-center gap-1"
    >
      <PaginationFirst />
      <PaginationPrev />
      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child
        >
          <Button
            class="w-10 h-10 p-0"
            :variant="item.value === page ? 'default' : 'outline'"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis
          v-else
          :key="item.type"
          :index="index"
        />
      </template>
      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </Pagination>
</template>
```

## API Reference

<!-- @include: @/content/meta/pagination.md -->

## Accessibility

Renders a `<nav>` landmark with native buttons for every page and control. Reka UI marks the current page with `aria-current="page"` and labels each page button.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the next focusable element. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves focus to the previous focusable element. |
| <kbd>Space</kbd> | When focus is on a page or an arrow button, goes to that page. |
| <kbd>Enter</kbd> | When focus is on a page or an arrow button, goes to that page. |
