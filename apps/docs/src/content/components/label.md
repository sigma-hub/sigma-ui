---
title: Label
description: Renders an accessible label associated with controls.
source: apps/docs/src/lib/registry/tailwind/ui/label
primitive: https://www.reka-ui.com/docs/components/label.html
---

## Preview

<ComponentPreview name="Label" />

## Installation

```bash
npx sigma-ui add label
```

## Examples

### Basic

```vue
<script setup lang="ts">
import { Label } from '@/components/ui/label'
</script>

<template>
  <Label for="email">Your email address</Label>
</template>
```
