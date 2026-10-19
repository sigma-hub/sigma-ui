---
title: Checkbox
description: Customizable checkbox input element.
source: checkbox
primitive: https://reka-ui.com/docs/components/checkbox
---

## Preview

<ComponentPreview name="Checkbox" />

## Installation

<ComponentInstall name="checkbox" />

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Checkbox } from '@/components/ui/checkbox';

const termsAccepted = ref<boolean | 'indeterminate'>(false);
</script>

<template>
  <Checkbox
    id="terms"
    v-model="termsAccepted"
    label="Accept terms and conditions"
  />
</template>
```

- Use `v-model` to control the checked state. It is `true`, `false`, or `'indeterminate'`.
- `label` and `description` render a label and helper text next to the checkbox. Pass an `id` so the label is linked to the checkbox.

## Examples

### Basic

<ComponentPreview name="CheckboxBasic" />

### Custom label and description

<ComponentPreview name="CheckboxWithDescription" />

### Disabled

<ComponentPreview name="CheckboxDisabled" />

### Form

Read the [vee-validate](https://vee-validate.logaretm.com/v4/examples/checkboxes-and-radio/) docs to learn more about form validation.

<ComponentPreview name="CheckboxFormSingle" />

<ComponentPreview name="CheckboxFormMultiple" />

## API Reference

<!-- @include: @/content/meta/checkbox.md -->

## Accessibility

Adheres to the [tri-state Checkbox WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/). Reka UI renders a `button` with `role="checkbox"` and `aria-checked`.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the checkbox. |
| <kbd>Space</kbd> | Checks or unchecks the checkbox. |
