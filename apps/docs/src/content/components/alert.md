---
title: Alert
description: Displays a callout for user attention.
source: alert
---

## Preview

<ComponentPreview name="Alert" />

## Installation

<ComponentInstall name="alert" />

## Usage

```vue
<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
</script>

<template>
  <Alert>
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components to your app using the cli.
    </AlertDescription>
  </Alert>
</template>
```

Set `variant` to `default` or `destructive`. An icon placed as the first child of `<Alert>` is positioned next to the title.

## Examples

### Basic

<ComponentPreview name="AlertBasic" />

### Default

<ComponentPreview name="Alert" />

### Destructive

<ComponentPreview name="AlertDestructive" />

## API Reference

<!-- @include: @/content/meta/alert.md -->

## Accessibility

Renders a `div` with `role="alert"`, so screen readers announce its content. It has no keyboard interactions of its own.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the next focusable element inside the alert, such as a link or button. |
