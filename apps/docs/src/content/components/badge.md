---
title: Badge
description: Displays a badge or a component that looks like a badge.
source: badge
---

## Preview

<ComponentPreview name="Badge" />

## Installation

<ComponentInstall name="badge" />

## Usage

```vue
<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
</script>

<template>
  <Badge variant="secondary">
    Badge
  </Badge>
</template>
```

Set `variant` to `default`, `secondary`, `outline`, or `destructive`. To give another element the badge styles, use `badgeVariants`:

```vue
<script setup lang="ts">
import { badgeVariants } from '@/components/ui/badge';
</script>

<template>
  <a
    href="/changelog"
    :class="badgeVariants({ variant: 'outline' })"
  >
    New
  </a>
</template>
```

## Examples

### Default

<ComponentPreview name="Badge" />

### Secondary

<ComponentPreview name="BadgeSecondary" />

### Outline

<ComponentPreview name="BadgeOutline" />

### Destructive

<ComponentPreview name="BadgeDestructive" />

## API Reference

<!-- @include: @/content/meta/badge.md -->

## Accessibility

Renders a plain `div` with no role. It has no keyboard interactions of its own.

| Key | Description |
| --- | --- |
| None | The badge is not focusable. If you render it as a link or button with `badgeVariants`, that element keeps its native keyboard behaviour. |
