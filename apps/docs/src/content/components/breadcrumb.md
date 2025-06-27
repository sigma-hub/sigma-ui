---
title: Breadcrumb
description: Displays the path to the current resource using a hierarchy of links.
---

## Preview

<ComponentPreview name="Breadcrumb" class="[&_.preview]:p-2" />

## Installation

```bash
npx sigma-ui add breadcrumb
```

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

Alternative way of using the breadcrumb component. Provides less customization but easier to use.

For this example to work, make sure to specify route `url:` and route `name:` values that are actually defined in your router.

<ComponentPreview name="BreadcrumbGenerator" class="[&_.preview]:p-2" />
