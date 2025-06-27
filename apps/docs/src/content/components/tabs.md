---
title: Tabs
description: A set of layered sections of content—known as tab panels—that are displayed one at a time.
source: apps/docs/src/lib/registry/tailwind/ui/tabs
primitive: https://www.reka-ui.com/docs/components/tabs.html
---

## Preview

<ComponentPreview name="Tabs" />

## Installation

```bash
npx sigma-ui add tabs
```

## Examples

### Basic

```vue
<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
</script>

<template>
  <Tabs
    default-value="account"
  >
    <TabsList>
      <TabsTrigger value="account">
        Account
      </TabsTrigger>
      <TabsTrigger value="password">
        Password
      </TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      Make changes to your account here.
    </TabsContent>
    <TabsContent value="password">
      Change your password here.
    </TabsContent>
  </Tabs>
</template>
```
