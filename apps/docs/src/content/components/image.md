---
title: Image
description: An image element with a fallback.
source: packages/lib/src/registry/tailwind/ui/image
---

## Preview

<ComponentPreview name="Image" />

## Installation

```bash
npx sigma-ui add image
```

## Examples

### Basic

<Description>
  Image component with just <code>src</code> prop.
</Description>

<ComponentPreview name="ImageBasic" />

### Glow

<Description>
  Prop <code>glow: boolean</code> - adds glowing effect to the image.
</Description>

<ComponentPreview name="ImageGlow" />

### Custom fallback

<Description>
  Slot <code>#fallback</code> - let's you provide custom fallback content.
</Description>

<ComponentPreview name="ImageCustomFallback" />

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
