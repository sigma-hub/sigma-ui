---
title: Field
description: Combine labels, controls, help text, and errors into accessible form fields.
source: field
label: New
---

## Preview

<ComponentPreview name="Field" size="lg" />

## Installation

<ComponentInstall name="field" />

## Usage

```vue
<script setup lang="ts">
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
</script>

<template>
  <FieldGroup>
    <Field>
      <FieldLabel for="name">Name</FieldLabel>
      <Input id="name" />
      <FieldDescription>Shown on your profile.</FieldDescription>
    </Field>
  </FieldGroup>
</template>
```

`Field` wraps one control with its label, description, and error. Set `orientation` to `vertical`, `horizontal`, or `responsive`.

- `FieldLabel` labels the control. Wrap a whole `Field` with it to build a selectable card.
- `FieldDescription` is helper text under the control or inside a `FieldSet`.
- `FieldError` shows error text from the `errors` prop or the default slot.
- `FieldContent` stacks a label and a description next to a checkbox, radio, or switch.
- `FieldTitle` is a title that is not tied to a single control.
- `FieldSet` and `FieldLegend` group related fields in a `fieldset`.
- `FieldGroup` stacks fields and is the container the `responsive` orientation measures.
- `FieldSeparator` divides groups, with optional text.

### Responsive orientation

`orientation="responsive"` stacks the label above the control in narrow containers and places them side by side when the parent `FieldGroup` is at least 28rem wide. It uses a container query, so it reacts to the width of the form, not the viewport.

## Examples

### Validation

Set `invalid` on `Field` and pass messages to `FieldError`. `errors` accepts strings or objects with a `message`, so validation issues from libraries such as Zod or VeeValidate can be passed directly. Duplicates and empty values are skipped.

<ComponentPreview name="FieldInvalid" />

### Choice card

Wrap a `Field` in `FieldLabel` to make the whole card clickable. The card is highlighted when the control inside it is checked.

<ComponentPreview name="FieldChoiceCard" />

### Responsive

<ComponentPreview name="FieldResponsive" />

## API Reference

<!-- @include: @/content/meta/field.md -->

## Accessibility

`Field` renders `role="group"`. `FieldSet` renders a native `fieldset`, which also disables every control inside it when it has the `disabled` attribute. `FieldError` renders `role="alert"`.

Set the `for` attribute of `FieldLabel` to the `id` of the control. Set `aria-invalid` on the control together with `invalid` on `Field`, so screen readers announce the error state.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the control inside the field. |
