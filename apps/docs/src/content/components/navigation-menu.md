---
title: Navigation Menu
description: A collection of links for navigating websites.
source: navigation-menu
primitive: https://reka-ui.com/docs/components/navigation-menu
---

## Preview

<ComponentPreview name="NavigationMenu" />

## Installation

<ComponentInstall name="navigation-menu" />

## Usage

```vue
<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="/docs">
            Link
          </NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
```

- An item with a `<NavigationMenuTrigger>` opens its `<NavigationMenuContent>` panel on hover or click.
- An item with only a `<NavigationMenuLink>` renders a top-level link.

## Examples

### Link Component

To render a router link such as Nuxt's `<NuxtLink />`, use `as-child` and apply the trigger styles with `navigationMenuTriggerStyle()`.

```vue
<script setup lang="ts">
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
</script>

<template>
  <NavigationMenuItem>
    <NavigationMenuLink
      as-child
      :class="navigationMenuTriggerStyle()"
    >
      <NuxtLink to="/docs">
        Documentation
      </NuxtLink>
    </NavigationMenuLink>
  </NavigationMenuItem>
</template>
```

## API Reference

<!-- @include: @/content/meta/navigation-menu.md -->

## Accessibility

Adheres to the [Disclosure Navigation Menu WAI-ARIA example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/). Reka UI manages focus and the `aria-expanded` state of the triggers.

| Key | Description |
| --- | --- |
| <kbd>Space</kbd> | When focus is on a trigger, opens its content. |
| <kbd>Enter</kbd> | When focus is on a trigger, opens its content. |
| <kbd>Tab</kbd> | Moves focus to the next focusable element. |
| <kbd>ArrowDown</kbd> | When focus is on a trigger in a horizontal menu, opens its content and focuses the first link. Moves focus to the next item in a vertical menu. |
| <kbd>ArrowUp</kbd> | Moves focus to the previous item in a vertical menu. |
| <kbd>ArrowRight</kbd> | Moves focus to the next trigger or link in a horizontal menu. |
| <kbd>ArrowLeft</kbd> | Moves focus to the previous trigger or link in a horizontal menu. |
| <kbd>Home</kbd> | Moves focus to the first trigger or link. |
| <kbd>End</kbd> | Moves focus to the last trigger or link. |
| <kbd>Esc</kbd> | Closes the open content and moves focus to its trigger. |
