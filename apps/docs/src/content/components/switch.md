---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
source: packages/lib/src/registry/tailwind/ui/switch
primitive: https://www.reka-ui.com/docs/components/switch.html
---

## Preview

<ComponentPreview name="Switch" />

## Installation

```bash
npx sigma-ui add switch
```

## Examples

### Basic

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@/components/ui/switch'

const airplaneMode = ref(false)
</script>

<template>
  <Switch
    :model-value="airplaneMode"
    @update:model-value="airplaneMode = $event"
  />
</template>
```

### Form

<ComponentPreview name="SwitchForm" />
