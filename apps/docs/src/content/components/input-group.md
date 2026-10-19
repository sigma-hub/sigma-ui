---
title: Input Group
description: Add icons, text, and buttons inside an input or textarea.
source: input-group
label: New
---

## Preview

<ComponentPreview name="InputGroup" />

## Installation

<ComponentInstall name="input-group" />

## Usage

```vue
<script setup lang="ts">
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
</script>

<template>
  <InputGroup>
    <InputGroupAddon>https://</InputGroupAddon>
    <InputGroupInput placeholder="sigma-ui.dev" />
  </InputGroup>
</template>
```

`InputGroup` draws the border and the focus outline. The control inside it is borderless.

- `InputGroupAddon` places content at `inline-start`, `inline-end`, `block-start`, or `block-end`. Clicking the addon focuses the control.
- `InputGroupButton` is a button sized to sit inside the field.
- `InputGroupText` is static text or an icon.
- `InputGroupInput` and `InputGroupTextarea` are the controls. They accept the same attributes as `Input` and `Textarea`.

## Examples

### Textarea

<ComponentPreview name="InputGroupTextarea" />

`align="block-end"` stacks the addon under the textarea.

### Invalid

<ComponentPreview name="InputGroupAddon" />

Set `aria-invalid` on the control. The group border turns destructive.

## API Reference

<!-- @include: @/content/meta/input-group.md -->

## Accessibility

The group renders `role="group"`. Addon content that is decorative, such as an icon, should be hidden from assistive technology with `aria-hidden`. Give the control a `<label>`, or set `aria-label`.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the control, then to any buttons in the addons. |
