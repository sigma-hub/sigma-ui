---
title: Stepper
description: A sequence of steps for a multi-part task.
source: stepper
primitive: https://reka-ui.com/docs/components/stepper
label: New
---

## Preview

<ComponentPreview name="Stepper" />

## Installation

<ComponentInstall name="stepper" />

## Usage

```vue
<script setup lang="ts">
import { Stepper, StepperIndicator, StepperItem, StepperTitle, StepperTrigger } from '@/components/ui/stepper';
</script>

<template>
  <Stepper>
    <StepperItem :step="1">
      <StepperTrigger>
        <StepperIndicator>1</StepperIndicator>
        <StepperTitle>Account</StepperTitle>
      </StepperTrigger>
    </StepperItem>
  </Stepper>
</template>
```

Bind the active step with `v-model`. Set `linear` so a step can be opened only after the previous one is complete. `orientation` is `horizontal` or `vertical`.

`StepperSeparator` draws the line between steps. It turns into the accent color once the step is completed.

## Examples

### Horizontal

<ComponentPreview name="Stepper" />

## API Reference

<!-- @include: @/content/meta/stepper.md -->

## Accessibility

The stepper follows the tabs pattern for a sequence: each step is a button, and arrow keys move between steps.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus into the stepper. |
| <kbd>ArrowRight</kbd> or <kbd>ArrowDown</kbd> | Moves to the next step. |
| <kbd>ArrowLeft</kbd> or <kbd>ArrowUp</kbd> | Moves to the previous step. |
| <kbd>Enter</kbd> or <kbd>Space</kbd> | Activates the focused step. |
