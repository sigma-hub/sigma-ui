---
title: Breadcrumb
description: Displays the path to the current resource using a hierarchy of links.
source: breadcrumb
---

## Preview

<ComponentPreview name="Breadcrumb" class="[&_.preview]:p-2" />

## Installation

<ComponentInstall name="breadcrumb" />

## Usage

```vue
<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/components">
          Components
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

Use `<BreadcrumbPage>` for the current page and `<BreadcrumbLink>` for the other items.

## Examples

### Custom separator

Use a custom component as `slot` for `<BreadcrumbSeparator />` to create a custom separator.

<ComponentPreview name="BreadcrumbSeparator" />

### Dynamic rendering

Example of rendering items dynamically.

<ComponentPreview name="BreadcrumbDynamic" />

### Dynamic rendering with ellipsis

Example of rendering items dynamically with ellipsis.

<ComponentPreview name="BreadcrumbDynamicWithEllipsis" />

### Dropdown

You can compose `<BreadcrumbItem />` with a `<DropdownMenu />` to create a dropdown in the breadcrumb.

<ComponentPreview name="BreadcrumbDropdown" class="[&_.preview]:p-2" />

### Collapsed

Use `<BreadcrumbEllipsis />` component to show collapsed state when the breadcrumb is too long.

<ComponentPreview name="BreadcrumbEllipsis" class="[&_.preview]:p-2" />

### Link component

To use a custom link component from your routing library, you can use the `asChild` prop on `<BreadcrumbLink />` - this will flatten the components and prevent creating a link inside of a link.

<ComponentPreview name="BreadcrumbLink" />

### Responsive

Here's an example of a responsive breadcrumb that composes `<BreadcrumbItem />` with `<BreadcrumbEllipsis />`, `<DropdownMenu />`, and `<Drawer />`.

It displays a dropdown on desktop and a drawer on mobile.

<ComponentPreview name="BreadcrumbResponsive" class="[&_.preview]:p-2" />

### Breadcrumb generator

`<BreadcrumbGenerator />` is an alternative way of using the breadcrumb component. Pass a `home` item and a `model` array of items. It provides less customization but is easier to use.

For this example to work, make sure to specify route `url:` and route `name:` values that are actually defined in your router.

<ComponentPreview name="BreadcrumbGenerator" class="[&_.preview]:p-2" />

## API Reference

<!-- @include: @/content/meta/breadcrumb.md -->

## Accessibility

Follows the [Breadcrumb WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/): it renders a `nav` landmark with `aria-label="breadcrumb"`, an ordered list of links, and marks the current page with `aria-current="page"`.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the next link in the breadcrumb. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves focus to the previous link in the breadcrumb. |
| <kbd>Enter</kbd> | Follows the focused link. |
