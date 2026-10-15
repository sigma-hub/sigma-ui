---
title: Avatar
description: An image element with a fallback for representing the user.
source: avatar
primitive: https://reka-ui.com/docs/components/avatar
---

## Preview

<ComponentPreview name="Avatar" />

## Installation

<ComponentInstall name="avatar" />

## Usage

```vue
<script setup lang="ts">
import { Avatar } from '@/components/ui/avatar';
</script>

<template>
  <Avatar
    src="/avatars/avatar.png"
    alt="User avatar"
  />
</template>
```

- `size` sets the dimensions: `xs`, `sm`, `base` (default), or `lg`.
- `shape` is `circle` (default) or `rounded`.
- If the image fails to load and you don't provide a `#fallback` slot, a default profile icon is rendered.

## Examples

### Basic

An avatar with just the `src` prop.

<ComponentPreview name="AvatarBasic" />

### Glow

The `glow` prop adds a glowing effect to the image.

<ComponentPreview name="AvatarGlow" />

### Custom fallback

Use the `#fallback` slot to provide custom content to show when the image fails to load.

<ComponentPreview name="AvatarCustomFallback" />

## API Reference

<!-- @include: @/content/meta/avatar.md -->

## Accessibility

Renders an `img` element, so pass a meaningful `alt` text (it defaults to `"image"`). It has no keyboard interactions of its own.

| Key | Description |
| --- | --- |
| None | The avatar is not focusable. |
