---
title: Radio Group
description: A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
source: packages/lib/src/registry/tailwind/ui/radio-group
primitive: https://www.reka-ui.com/docs/components/radio-group.html
---

## Preview

<ComponentPreview name="RadioGroup" />

## Installation

```bash
npx sigma-ui add radio-group
```

## Examples

### Basic

```vue
<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
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

### Form

Read [vee-validate](https://vee-validate.logaretm.com/v4/examples/checkboxes-and-radio/) docs to learn more about form validation.

<ComponentPreview name="RadioGroupForm" />
