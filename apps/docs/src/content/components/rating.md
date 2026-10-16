---
title: Rating
description: A star rating that can be set with the pointer or the keyboard.
source: rating
primitive: https://reka-ui.com/docs/components/rating
label: New
---

## Preview

<ComponentPreview name="Rating" />

## Installation

<ComponentInstall name="rating" />

## Usage

```vue
<script setup lang="ts">
import { StarIcon } from 'lucide-vue-next';
import { Rating, RatingItem, RatingItemIndicator } from '@/components/ui/rating';
</script>

<template>
  <Rating v-model="value">
    <template #default="{ items }">
      <RatingItem
        v-for="item in items"
        :key="item"
        v-slot="{ steps }"
        :item="item"
      >
        <RatingItemIndicator
          v-for="step in steps"
          :key="step"
          :step="step"
        >
          <StarIcon />
        </RatingItemIndicator>
      </RatingItem>
    </template>
  </Rating>
</template>
```

`v-model` is the selected value. `length` is the number of items, and `step` can be `1`, `0.5`, `0.25`, or `0.1`. Set `clearable` so choosing the current value resets it to `0`.

## Examples

### Stars

<ComponentPreview name="Rating" />

## API Reference

<!-- @include: @/content/meta/rating.md -->

## Accessibility

The rating is a radio group. Each value is a radio button, and arrow keys move between values.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus into the rating. |
| <kbd>ArrowRight</kbd> or <kbd>ArrowDown</kbd> | Selects the next value. |
| <kbd>ArrowLeft</kbd> or <kbd>ArrowUp</kbd> | Selects the previous value. |
| <kbd>Space</kbd> | Selects the focused value. |
