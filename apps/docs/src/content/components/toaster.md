---
title: Toaster
description: An opinionated toast component for Vue.
docs: https://vue-sonner.vercel.app
source: apps/docs/src/lib/registry/tailwind/ui/toaster
---

## Preview

<ComponentPreview name="ToasterCustomProgress" />

## Dependencies

- The component is based on [vue-sonner](https://vue-sonner.vercel.app/)

## Installation

<Steps>

### Run the following command

```bash
npx sigma-ui add toaster
```

### Add the Toaster component

Add the following `Toaster` component to your `App.vue` file:

```vue title="App.vue" {2,6}
<script setup lang="ts">
import { Toaster } from '@/components/ui/toaster'
</script>

<template>
  <Toaster />
</template>
```

</Steps>

## Examples

### Basic

<ComponentPreview name="Toaster" />

### Basic with Dialog

<ComponentPreview name="ToasterWithDialog" />

### Custom "simple" template 

<ComponentPreview name="ToasterCustomSimple" />

### Custom "progress" template 

<ComponentPreview name="ToasterCustomProgress" />
