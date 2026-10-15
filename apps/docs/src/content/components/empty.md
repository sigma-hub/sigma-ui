---
title: Empty
description: A placeholder for a page or section that has no content yet.
source: empty
label: New
---

## Preview

<ComponentPreview name="Empty" />

## Installation

<ComponentInstall name="empty" />

## Usage

```vue
<script setup lang="ts">
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FolderIcon />
      </EmptyMedia>
      <EmptyTitle>No projects yet</EmptyTitle>
      <EmptyDescription>Create a project to get started.</EmptyDescription>
    </EmptyHeader>
  </Empty>
</template>
```

Put the next action, such as a button, in `EmptyContent`.

## Examples

### With action

<ComponentPreview name="Empty" />

## API Reference

<!-- @include: @/content/meta/empty.md -->

## Accessibility

The empty state is presentational. The title and description are regular text, and the action is a button, so it is reachable with the keyboard.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the action inside the empty state. |
