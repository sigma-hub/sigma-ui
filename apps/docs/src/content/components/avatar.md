---
title: Avatar
description: An image element with a fallback for representing the user.
source: packages/lib/src/registry/tailwind/ui/avatar
primitive: https://www.reka-ui.com/docs/components/avatar.html
---

## Preview

<ComponentPreview name="Avatar" />

## Installation

```bash
npx sigma-ui add avatar
```

## Examples

### Basic

<Description>
  Image component with just <code>src</code> prop.
</Description>

<ComponentPreview name="AvatarBasic" />

### Glow

<Description>
  Prop <code>glow: boolean</code> - adds glowing effect to the image.
</Description>

<ComponentPreview name="AvatarGlow" />

### Custom fallback

<Description>
  Slot <code>#fallback</code> - let's you provide custom fallback content.

  If you don't provide a fallback and the image fails to load, it will render default "profile" icon.
</Description>

<ComponentPreview name="AvatarCustomFallback" />

## API

### Props

#### `src`

- Type: `string`

#### `alt`

- Type: `string`
- Default: `'image'`

The alt text for the image.

#### `glow`

- Type: `boolean`
- Default: `false`

Adds a glowing effect to the image.

#### `class`

- Type: `string`

Additional CSS classes to apply to the image container.

#### `shape`

- Type: `'rounded' | 'circle'`
- Default: `'rounded'`

Determines the shape of the image.

---

### Slots

#### `fallback`

Allows you to provide a custom fallback content. By default, it renders image icon with "no photo" text under it.
