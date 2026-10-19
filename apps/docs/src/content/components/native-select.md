---
title: Native Select
description: A styled native select element.
source: native-select
label: New
---

## Preview

<ComponentPreview name="NativeSelect" />

## Installation

<ComponentInstall name="native-select" />

## Usage

```vue
<script setup lang="ts">
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';

const fruit = ref('');
</script>

<template>
  <NativeSelect v-model="fruit" aria-label="Fruit">
    <NativeSelectOption value="apple">Apple</NativeSelectOption>
    <NativeSelectOption value="banana">Banana</NativeSelectOption>
  </NativeSelect>
</template>
```

`NativeSelect` binds with `v-model`. Group options with `NativeSelectOptGroup`. Native attributes such as `disabled` and `multiple` pass through to the `<select>`.

## Examples

### Groups

<ComponentPreview name="NativeSelectGroup" />

## API Reference

<!-- @include: @/content/meta/native-select.md -->

## Accessibility

This is a native `<select>`, so the browser provides the listbox behavior and keyboard support. Give it a `<label>` or `aria-label`.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the select. |
| <kbd>Space</kbd> or <kbd>Enter</kbd> | Opens the option list. |
| <kbd>ArrowUp</kbd> or <kbd>ArrowDown</kbd> | Moves between options. |
| <kbd>Esc</kbd> | Closes the list. |
