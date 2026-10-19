---
title: Accordion
description: Set of interactive collapsible sections.
source: accordion
primitive: https://reka-ui.com/docs/components/accordion
---

## Preview

<ComponentPreview name="Accordion" class="sm:max-w-[70%]" />

## Installation

<ComponentInstall name="accordion" />

## Usage

```vue
<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
</script>

<template>
  <Accordion
    type="single"
    collapsible
    default-value="item-1"
  >
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
```

- Use `defaultValue` to open an item initially, or `v-model` to control the open item(s).
- With `type="single"`, one item is open at a time and `v-model` is a `string`.
- With `type="multiple"`, several items can be open and `v-model` is a `string[]`.

## Examples

### Basic

Displays a `single` item, collapsed by default, with no `defaultValue` or `v-model`.

<ComponentPreview name="AccordionBasic" />

### Multiple

Displays `multiple` expanded items at once, controlled through `v-model`.

<ComponentPreview name="AccordionMultiple" />

## API Reference

<!-- @include: @/content/meta/accordion.md -->

## Accessibility

Adheres to the [Accordion WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/).

| Key | Description |
| --- | --- |
| <kbd>Space</kbd> | When focus is on the trigger of a collapsed section, expands the section. |
| <kbd>Enter</kbd> | When focus is on the trigger of a collapsed section, expands the section. |
| <kbd>Tab</kbd> | Moves focus to the next focusable element. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves focus to the previous focusable element. |
| <kbd>ArrowDown</kbd> | Moves focus to the next trigger. |
| <kbd>ArrowUp</kbd> | Moves focus to the previous trigger. |
| <kbd>Home</kbd> | When focus is on a trigger, moves focus to the first trigger. |
| <kbd>End</kbd> | When focus is on a trigger, moves focus to the last trigger. |
