---
title: Theming
description: Use CSS Variables to customize the look and feel of your application.
---

### Variables

If you setup `SIGMA-UI` to use CSS Variables, they will be added to your index css file during [initialization](/docs/cli.html).

Below is the list of all variables used in the `SIGMA-UI` components. You can customize them and add your own:

<Steps>

Primary background and text colors
```
--background: 0 0% 100%;
--foreground: 222.2 47.4% 11.2%;
```

Muted backgrounds in components like `<TabsList />`, `<Skeleton />`, and `<Switch />`
```
--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;
```

Background color for `<Card />`
```
--card: 0 0% 100%;
--card-foreground: 222.2 47.4% 11.2%;
```

Background color in popover components like `<DropdownMenu />`, `<HoverCard />`, and `<Popover />`
```
--popover: 0 0% 100%;
--popover-foreground: 222.2 47.4% 11.2%;
```

Border color
```
--border: 214.3 31.8% 91.4%;
```

Border color for inputs like `<Input />`, `<Select />`, and `<Textarea />`
```
--input: 214.3 31.8% 91.4%;
```

Primary colors for components like `<Button />`, `<Slider />`, and `<Calendar />`
```
--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;
```

Secondary colors for components like `<Button />`, `<Slider />`, and `<Calendar />`
```
--secondary: 210 40% 96.1%;
--secondary-foreground: 222.2 47.4% 11.2%;
```

Used for destructive actions such as `<Button variant="destructive">`
```
--destructive: 0 100% 50%;
--destructive-foreground: 210 40% 98%;
```

Used for focus ring
```
--ring: 215 20.2% 65.1%;
```

Border radius for card, input and buttons
```
--radius: 0.5rem;
```

Spacing step for padding, gaps and sizes (CSS style system; Tailwind defines it in its theme)
```
--spacing: 0.25rem;
```
</Steps>

### Pixel-based spacing

Spacing and sizes are in `rem`, so components grow when the user raises the browser's default font size. If you'd rather keep spacing in pixels, change the spacing step:

Tailwind style system:

```css
@theme {
  --spacing: 4px;
}
```

CSS style system:

```css
:root {
  --spacing: 4px;
}
```

All spacing and sizing (padding, margin, gap, width, height, icon sizes) switches from `rem` to `px`. At the default 16px font size nothing moves. Font sizes, line heights, radii, breakpoints and container widths such as `max-w-md` stay in `rem`.

The tradeoff: buttons, inputs and other controls no longer grow with the user's default font size, while their text still does, so large text can get cramped or clipped in fixed-height controls. Browser zoom still scales everything.

### Overriding component styles

The CSS style system puts every component style in a [cascade layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer). `init` writes the layer order at the top of your stylesheet:

```css
@layer base, components;

@import "./preflight.css" layer(base);

@layer base {
  /* theme variables, body, border color */
}
```

- `base` holds the preflight and the theme.
- `components` holds the styles inside the component files (`@layer components { .sigma-ui-button { ... } }`).
- CSS that is not in a layer beats both, whatever its specificity or load order.

Each component style also starts with `@layer base, components;`. The first place a layer is named fixes its position, and a bundler can load a component's CSS before your stylesheet, so repeating the order keeps `base` below `components` whichever file loads first.

So a plain class overrides a component style without `!important` or extra specificity:

```css
.brand-button {
  background-color: oklch(0.55 0.22 27);
  border-radius: 0;
}
```

```vue
<Button class="brand-button">Save</Button>
```

That also means global element rules in your own CSS, such as `code { padding: 4px }` or `h1 { margin: 0 }`, apply inside components. Put resets like that in `@layer base` so the components keep their own styles:

```css
@layer base {
  code {
    font-family: var(--font-mono);
  }
}
```

To keep your own layered styles above the components, declare your layer after them: `@layer base, components, app;`. The layer names match Tailwind v4, so in a project that also uses Tailwind the component styles join its `components` layer and utilities still win. With the Tailwind style system there are no component stylesheets: pass utility classes, and `cn` merges them over the defaults.

### Color format

Theme colors are OKLCH values in the stylesheet. Tailwind utilities read them through `@theme inline`, so `bg-foreground/50` still sets the alpha:

```html
<div class="bg-foreground/50">
  Text with 50% opacity
</div>
```

### Adding new variables

Add the color to the stylesheet and expose it in `@theme inline`. A new project has no `tailwind.config.js`.

```css
:root {
  --warning: oklch(0.75 0.15 75);
  --warning-foreground: oklch(0.98 0.02 95);
}

.dark {
  --warning: oklch(0.98 0.02 95);
  --warning-foreground: oklch(0.45 0.12 55);
}

@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

After that, you can use this `warning` utility class in your components:

```html /bg-warning/ /text-warning-foreground/
<div class="bg-warning text-warning-foreground" />
```
