---
title: Infusion
description: Displays a visual effect layer that changes appearance of all components
source: apps/docs/src/lib/registry/tailwind/ui/infusion
primitive: https://www.reka-ui.com/docs/components/infusion.html
---

<script setup>
import InfusionVideoPreview from '../ui/InfusionVideoPreview.vue'
import InfusionInteractivePreview from '../ui/InfusionInteractivePreview.vue'
</script>

## Preview


Try adjusting parameters bellow to see how they affect the Infusion effect. Toggle the global Infusion switch to enable/disable the page-wide effect:

<InfusionInteractivePreview />


## Video preview 

<InfusionVideoPreview />

#### History

This component was initially invented in [Sigma File Manager](https://github.com/aleksey-hoffman/sigma-file-manager) app

## Installation

```bash
npx sigma-ui add infusion
```

## Examples
### Full-page Effect

By default, Infusion component affects the entire page:

```vue
<script setup lang="ts">
import { Infusion } from '@/components/ui/infusion'
</script>

<template>
  <div>
    <Infusion src="/background-image.png" />
    <div>
      <!-- Your page content -->
    </div>
  </div>
</template>
```

### Contained Effect

Use `relative` prop to contain the effect within a specific container:

```vue
<script setup lang="ts">
import { Infusion } from '@/components/ui/infusion'
</script>

<template>
  <div class="relative h-[400px] rounded-lg overflow-hidden">
    <Infusion
      src="/background-image.png"
      relative
    />
    <div class="relative z-10">
      <!-- Your content -->
    </div>
  </div>
</template>
```
