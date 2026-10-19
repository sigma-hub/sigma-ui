---
title: Item
description: A row that groups media, text, and actions.
source: item
label: New
---

## Preview

<ComponentPreview name="Item" />

## Installation

<ComponentInstall name="item" />

## Usage

```vue
<script setup lang="ts">
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
</script>

<template>
  <Item variant="outline">
    <ItemMedia variant="icon">
      <ShieldIcon />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Security</ItemTitle>
      <ItemDescription>Manage how you sign in.</ItemDescription>
    </ItemContent>
  </Item>
</template>
```

`variant` is `default`, `outline`, or `muted`. `size` is `default` or `sm`. Render the row as a link with `as` or `as-child`.

- `ItemMedia` frames an icon or an image.
- `ItemActions` holds buttons.
- `ItemHeader` and `ItemFooter` span the full width of the row.
- `ItemGroup` stacks rows. Divide them with `ItemSeparator`.

## Examples

### Group

<ComponentPreview name="ItemGroup" />

## API Reference

<!-- @include: @/content/meta/item.md -->

## Accessibility

`ItemGroup` renders `role="list"`. When a row navigates, render it as a link. Actions inside the row stay buttons.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to a link row or to an action inside the row. |
| <kbd>Enter</kbd> | Activates the focused link or button. |
