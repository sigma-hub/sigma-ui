---
title: Radio Group
description: A set of checkable buttons, known as radio buttons, where no more than one of the buttons can be checked at a time.
source: radio-group
primitive: https://reka-ui.com/docs/components/radio-group
---

## Preview

<ComponentPreview name="RadioGroup" />

## Installation

<ComponentInstall name="radio-group" />

## Usage

```vue
<script setup lang="ts">
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
</script>

<template>
  <RadioGroup default-value="option-one">
    <div class="flex items-center space-x-2">
      <RadioGroupItem
        id="option-one"
        value="option-one"
      />
      <Label for="option-one">Option One</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem
        id="option-two"
        value="option-two"
      />
      <Label for="option-two">Option Two</Label>
    </div>
  </RadioGroup>
</template>
```

- Use `defaultValue` to check an item initially, or `v-model` to control the checked item.
- Set `orientation` to match the layout, so the arrow keys move in the expected direction.

## Examples

### Form

Read the [vee-validate](https://vee-validate.logaretm.com/v4/examples/checkboxes-and-radio/) docs to learn more about form validation.

<ComponentPreview name="RadioGroupForm" />

## API Reference

<!-- @include: @/content/meta/radio-group.md -->

## Accessibility

Adheres to the [Radio Group WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) and uses roving tabindex to manage focus between the items. Reka UI handles it.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the checked item, or to the first item in the group. |
| <kbd>Space</kbd> | When focus is on an unchecked item, checks it. |
| <kbd>ArrowDown</kbd> | Moves focus to the next item and checks it. |
| <kbd>ArrowRight</kbd> | Moves focus to the next item and checks it. |
| <kbd>ArrowUp</kbd> | Moves focus to the previous item and checks it. |
| <kbd>ArrowLeft</kbd> | Moves focus to the previous item and checks it. |
