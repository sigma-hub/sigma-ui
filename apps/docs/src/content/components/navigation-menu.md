---
title: Navigation Menu
description: A collection of links for navigating websites.
source: apps/docs/src/lib/registry/tailwind/ui/navigation-menu
primitive: https://www.reka-ui.com/docs/components/navigation-menu.html
---

## Preview

<ComponentPreview name="NavigationMenu" />

## Installation

```bash
npx sigma-ui add navigation-menu
```

## Examples

### Basic

```vue
<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink>Link</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
```

### Link Component

When using the Nuxt `<NuxtLink />` component, you can use `navigationMenuTriggerStyle()` to apply the correct styles to the trigger.

```ts
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
```

```vue
<template>
  <NavigationMenuItem>
    <NuxtLink to="/docs">
      <NavigationMenuLink :class="navigationMenuTriggerStyle()">
        Documentation
      </NavigationMenuLink>
    </NuxtLink>
  </NavigationMenuItem>
</template>
```
