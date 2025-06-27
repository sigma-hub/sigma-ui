---
title: Toggle Group
description: A set of two-state buttons that can be toggled on or off.
source: apps/docs/src/lib/registry/tailwind/ui/toggle-group
primitive: https://www.reka-ui.com/docs/components/toggle-group.html
---

## Preview

<ComponentPreview name="ToggleGroup" />

## Installation

```bash
npx sigma-ui add toggle-group
```

## Usage

```vue
<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
</script>

<template>
  <ToggleGroup type="single">
    <ToggleGroupItem value="a">
      A
    </ToggleGroupItem>
    <ToggleGroupItem value="b">
      B
    </ToggleGroupItem>
    <ToggleGroupItem value="c">
      C
    </ToggleGroupItem>
  </ToggleGroup>
</template>
```

## Examples

### Default

<ComponentPreview name="ToggleGroup" />

### Outline

<ComponentPreview name="ToggleGroupOutline" />

### Single

<ComponentPreview name="ToggleGroupSingle" />

### Small

<ComponentPreview name="ToggleGroupSmall" />

### Large

<ComponentPreview name="ToggleGroupLarge" />

### Disabled

<ComponentPreview name="ToggleGroupDisabled" />
