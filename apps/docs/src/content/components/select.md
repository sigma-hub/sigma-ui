---
title: Select
description: Displays a list of options for the user to pick from—triggered by a button.
source: packages/lib/src/registry/tailwind/ui/select
primitive: https://www.reka-ui.com/docs/components/select.html
---

## Preview

<ComponentPreview name="Select" />

## Installation

```bash
npx sigma-ui add select
```

## Examples

### Basic

```vue
<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
</script>

<template>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">
          Apple
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
```

### Scrollable

<ComponentPreview name="SelectScrollable" />

### Form

<ComponentPreview name="SelectForm" />
