---
title: Card
description: Displays a card with header, content, and footer.
source: card
---

## Preview

<ComponentPreview name="CardForm" size="lg" />

## Installation

<ComponentInstall name="card" />

## Usage

```vue
<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card Description</CardDescription>
    </CardHeader>
    <CardContent>
      Card Content
    </CardContent>
    <CardFooter>
      Card Footer
    </CardFooter>
  </Card>
</template>
```

## Examples

### Basic

<ComponentPreview name="CardBasic" />

### Notifications

<ComponentPreview name="CardNotifications" size="lg" />

## API Reference

<!-- @include: @/content/meta/card.md -->

## Accessibility

Renders plain `div` and heading elements with no role. It has no keyboard interactions of its own.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the next focusable element inside the card, such as an input or button. |
